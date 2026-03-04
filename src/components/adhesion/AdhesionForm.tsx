"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FormData {
    prenom: string;
    nom: string;
    email: string;
    message: string;
}

interface FormErrors {
    prenom?: string;
    nom?: string;
    email?: string;
    message?: string;
}

type Status = "idle" | "loading" | "success" | "error";

const inputBase =
    "w-full border rounded-lg outline-none bg-white px-4 py-3 font-satoshi text-[#2C1A0E] placeholder:text-[#9A7558]/60 transition-colors duration-200 text-base";

export default function AdhesionForm() {
    const formRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<FormData>({ prenom: "", nom: "", email: "", message: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            formRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 85%",
                    once: true,
                },
            }
        );
    });

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!data.prenom.trim()) newErrors.prenom = "Champ requis";
        if (!data.nom.trim()) newErrors.nom = "Champ requis";
        if (!data.email.trim()) {
            newErrors.email = "Champ requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = "Adresse email invalide";
        }
        if (!data.message.trim()) newErrors.message = "Champ requis";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/adhesion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
                setErrorMessage(json.error || "Une erreur est survenue.");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Impossible de contacter le serveur.");
        }
    };

    const inputClass = (field: keyof FormErrors) =>
        `${inputBase} ${errors[field]
            ? "border-red-400 focus:border-red-400"
            : "border-[#E9BA85]/60 focus:border-[#C2AE4C]"
        }`;

    if (status === "success") {
        return (
            <div ref={formRef} className="bg-[#F0DBD8] rounded-2xl p-8 md:p-12 max-w-xl w-full text-center">
                <p className="text-2xl mb-4 text-[#C2AE4C]">✦</p>
                <h3 className="font-neulis text-xl font-semibold text-[#2C1A0E] mb-3">
                    Demande envoyée !
                </h3>
                <p className="font-satoshi text-[#5C3D26] leading-relaxed">
                    Merci pour votre intérêt. Nous reviendrons vers vous très prochainement.
                </p>
            </div>
        );
    }

    return (
        <div
            ref={formRef}
            className="bg-white rounded-2xl border border-[#C2AE4C] p-8 md:p-12 max-w-xl w-full opacity-0"
            style={{ filter: "drop-shadow(0px 4px 10px rgba(44, 26, 14, 0.15))" }}
        >
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Prénom + Nom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="font-satoshi text-sm text-[#5C3D26]">Prénom</label>
                        <input
                            type="text"
                            value={data.prenom}
                            onChange={(e) => setData((d) => ({ ...d, prenom: e.target.value }))}
                            placeholder="Marie"
                            className={inputClass("prenom")}
                        />
                        {errors.prenom && (
                            <span className="font-satoshi text-xs text-red-500">{errors.prenom}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="font-satoshi text-sm text-[#5C3D26]">Nom</label>
                        <input
                            type="text"
                            value={data.nom}
                            onChange={(e) => setData((d) => ({ ...d, nom: e.target.value }))}
                            placeholder="Dupont"
                            className={inputClass("nom")}
                        />
                        {errors.nom && (
                            <span className="font-satoshi text-xs text-red-500">{errors.nom}</span>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-sm text-[#5C3D26]">Adresse email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                        placeholder="marie@exemple.fr"
                        className={inputClass("email")}
                    />
                    {errors.email && (
                        <span className="font-satoshi text-xs text-red-500">{errors.email}</span>
                    )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-sm text-[#5C3D26]">Votre message</label>
                    <textarea
                        value={data.message}
                        onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                        placeholder="Présentez-vous et dites-nous ce qui vous attire dans la dentelle aux fuseaux…"
                        className={`${inputClass("message")} min-h-[140px] resize-none`}
                    />
                    {errors.message && (
                        <span className="font-satoshi text-xs text-red-500">{errors.message}</span>
                    )}
                </div>

                {/* Erreur globale */}
                {status === "error" && (
                    <p className="font-satoshi text-sm text-red-500">{errorMessage}</p>
                )}

                {/* Submit */}
                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="font-satoshi text-sm font-medium px-8 py-3 bg-[#2C1A0E] text-[#FEF5EB] rounded-full hover:bg-[#5C3D26] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande →"}
                    </button>
                </div>
            </form>
        </div>
    );
}
