import React, {useEffect, useState} from "react";
import {getAuthHeaders} from '../lib/auth.js';
import {useAuth} from '../contexts/AuthContext.jsx';

export default function MultiStepForm() {
    const {userId} = useAuth();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        naam: "",
        email: "",
        straat: "",
        postcode: "",
        question: "",
        description: ""
    });

    const [inquiryTypes, setInquiryTypes] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePostcode = (pc) => {
        return /^\d{4}\s?[A-Za-z]{2}$/.test(pc.trim());
    };

    const validateStep = (s) => {
        const newErrors = {};
        if (s === 1) {
            if (!formData.naam.trim()) newErrors.naam = "Naam is vereist.";
            if (!formData.email.trim()) newErrors.email = "Email is vereist.";
            else if (!validateEmail(formData.email.trim())) newErrors.email = "Voer een geldig emailadres in.";
        } else if (s === 2) {
            if (!formData.straat.trim()) newErrors.straat = "Straat is vereist.";
            if (!formData.postcode.trim()) newErrors.postcode = "Postcode is vereist.";
            else if (!validatePostcode(formData.postcode)) newErrors.postcode = "Voer een geldige postcode in (1234AB of 1234 AB).";
        } else if (s === 3) {
            if (!selectedOption) newErrors.selectedOption = "Kies een aanvraagtype.";
        } else if (s === 4) {
            if (!formData.question.trim()) newErrors.question = "Korte vraag is vereist.";
            if (!formData.description.trim() || formData.description.trim().length < 10) newErrors.description = "Beschrijf uw situatie (minimaal 10 tekens).";
        }
        setErrors((prev) => ({...prev, ...newErrors}));
        return Object.keys(newErrors).length === 0;
    };

    const validateAll = () => {
        const stepsToCheck = [1, 2, 3, 4];
        for (const s of stepsToCheck) {
            if (!validateStep(s)) {
                // move user to first failing step
                setStep(s);
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        setResultMessage("");
        if (validateStep(step)) {
            setStep((prev) => prev + 1);
        } else {
            setResultMessage("Controleer de velden in deze stap.");
        }
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // clear field error while typing
        setErrors((prev) => ({...prev, [name]: ""}));
    };

    useEffect(() => {
        async function fetchInquiryTypes() {
            try {
                const response = await fetch(`http://145.24.237.215:8000/v2/api/inquiry-types`, {
                    method: "GET",
                    headers: getAuthHeaders()
                });

                if (!response.ok) {
                    throw new Error("Kon inquiry types niet ophalen");
                }

                const data = await response.json();
                setInquiryTypes(data);
            } catch (error) {
                console.error(error);
                setResultMessage("Fout bij het ophalen van de aanvraagtypes.");
            } finally {
                setLoadingTypes(false);
            }
        }

        fetchInquiryTypes();
    }, []);

    // New effect: fetch current user and pre-fill naam/email if available and fields are empty
    useEffect(() => {
        if (!userId) return;

        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(`http://145.24.237.215:8000/v2/api/user/${userId}`, {
                    method: 'GET',
                    headers: getAuthHeaders()
                });

                if (!res.ok) {
                    // don't throw for 401/other here; just skip prefilling
                    console.warn('Could not fetch user for prefilling WMO form:', res.status);
                    return;
                }

                const json = await res.json();
                const user = json.user || {};

                const computedName = (user.first_name || user.name || '') + (user.last_name ? ` ${user.last_name}` : '');
                setFormData(prev => ({
                    ...prev,
                    naam: prev.naam && prev.naam.trim() ? prev.naam : (computedName.trim() || prev.naam),
                    email: prev.email && prev.email.trim() ? prev.email : (user.email || prev.email)
                }));
            } catch (err) {
                console.error('Prefill user error:', err);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [userId]);

    const handleSubmit = async () => {
        setResultMessage("");
        if (!validateAll()) {
            return;
        }

        if (!selectedOption) {
            setErrors((prev) => ({...prev, selectedOption: "Kies een aanvraagtype."}));
            setResultMessage("Kies een aanvraagtype.");
            setStep(3);
            return;
        }

        setSubmitting(true);

        const payload = {
            type_id: selectedOption,
            created_at: new Date().toISOString(),
            content: {
                naam: formData.naam,
                email: formData.email,
                straat: formData.straat,
                postcode: formData.postcode,
                beschrijving: formData.description
            },
            status: "OPEN",
            question: formData.question
        };

        try {
            const response = await fetch(`http://145.24.237.215:8000/v2/api/inquiry`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });

            const contentType = response.headers.get('content-type') || '';
            let data;
            if (contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Inquiry POST returned non-JSON:', text);
                throw new Error(text || 'Ongeldig antwoord bij verzenden aanvraag');
            }

            if (!response.ok) {
                throw new Error(data.message || "Er ging iets mis bij het versturen.");
            }

            setResultMessage("Uw aanvraag is succesvol verzonden.");
            console.log("Inquiry response:", data);
        } catch (error) {
            console.error(error);
            setResultMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center">
            <div className="w-full bg-blue-200 py-12 px-6 shadow-md rounded-b-xl mb-12">
                <h1 className="text-3xl font-semibold text-center mb-2">WMO-aanvragen</h1>
                <p className="text-center text-gray-700 mb-10">Wet maatschappelijke ondersteuning</p>

                <div className="max-w-4xl mx-auto">
                    <div className="relative flex items-center justify-between">
                        <div className="absolute top-1/2 left-4 right-4 h-2 bg-blue-800 -translate-y-1/2"></div>

                        {[1, 2, 3, 4, 5].map((s) => (
                            <div
                                key={s}
                                className={`relative z-10 w-8 h-8 rounded-full border-4
                ${step === s
                                    ? "bg-red-500 border-red-500"
                                    : step > s
                                        ? "bg-blue-800 border-blue-800"
                                        : "bg-white border-blue-800"
                                }`}
                            />
                        ))}
                    </div>

                    <p className="text-center text-gray-700 mt-4">Stap {step} van 5</p>
                </div>
            </div>

            <div
                className="bg-white border-4 border-blue-800 rounded-xl shadow-xl w-full max-w-5xl p-16 mb-20 mx-6 h-auto">
                {resultMessage && (
                    <div className="mb-4 p-3 rounded bg-gray-100 text-sm text-gray-700">
                        {resultMessage}
                    </div>
                )}

                {step === 1 && (
                    <div>
                        <h2 className="text-xl mb-4">Persoonlijke informatie</h2>

                        <input
                            type="text"
                            name="naam"
                            placeholder="Naam"
                            value={formData.naam}
                            onChange={handleChange}
                            className="border p-2 w-full mb-1"
                        />
                        {errors.naam && <div className="text-red-600 text-sm mb-2">{errors.naam}</div>}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.email && <div className="text-red-600 text-sm mb-2">{errors.email}</div>}

                        <button
                            onClick={handleNext}
                            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Volgende
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-xl mb-4">Adres informatie</h2>

                        <input
                            type="text"
                            name="straat"
                            placeholder="Straat"
                            value={formData.straat}
                            onChange={handleChange}
                            className="border p-2 w-full mb-1"
                        />
                        {errors.straat && <div className="text-red-600 text-sm mb-2">{errors.straat}</div>}

                        <input
                            type="text"
                            name="postcode"
                            placeholder="Postcode (1234AB)"
                            value={formData.postcode}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.postcode && <div className="text-red-600 text-sm mb-2">{errors.postcode}</div>}

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevStep}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Vorige
                            </button>

                            <button
                                onClick={handleNext}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Volgende
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="text-xl mb-6">Kies een aanvraagtype</h2>

                        {loadingTypes ? (
                            <p>Aanvraagtypes laden...</p>
                        ) : (
                            <div className="grid gap-3 mb-6">
                                {inquiryTypes.map((type) => (
                                    <label
                                        key={type.id || type._id}
                                        onClick={() => {
                                            setSelectedOption(type.id || type._id);
                                            setErrors((prev) => ({...prev, selectedOption: ""}));
                                        }}
                                        className={`border rounded p-3 cursor-pointer ${
                                            selectedOption === (type.id || type._id)
                                                ? "border-blue-600 bg-blue-50"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <div className="font-medium">{type.name}</div>
                                        {type.description && (
                                            <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        )}
                        {errors.selectedOption &&
                            <div className="text-red-600 text-sm mb-2">{errors.selectedOption}</div>}

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevStep}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Vorige
                            </button>

                            <button
                                onClick={handleNext}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Volgende
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <h2 className="text-xl mb-4">Uw vraag</h2>

                        <input
                            type="text"
                            name="question"
                            placeholder="Korte vraag"
                            value={formData.question}
                            onChange={handleChange}
                            className="border p-2 w-full mb-1"
                        />
                        {errors.question && <div className="text-red-600 text-sm mb-2">{errors.question}</div>}

                        <textarea
                            name="description"
                            placeholder="Beschrijf uw situatie"
                            value={formData.description}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            rows={6}
                        />
                        {errors.description && <div className="text-red-600 text-sm mb-2">{errors.description}</div>}

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevStep}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Vorige
                            </button>

                            <button
                                onClick={handleNext}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Volgende
                            </button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div>
                        <h2 className="text-xl mb-4">Bevestiging</h2>

                        <div className="mb-4 text-sm text-gray-700 space-y-2">
                            <p><strong>Naam:</strong> {formData.naam}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Straat:</strong> {formData.straat}</p>
                            <p><strong>Postcode:</strong> {formData.postcode}</p>
                            <p><strong>Vraag:</strong> {formData.question}</p>
                            <p><strong>Beschrijving:</strong> {formData.description}</p>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={prevStep}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Vorige
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                {submitting ? "Bezig..." : "Verzenden"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
