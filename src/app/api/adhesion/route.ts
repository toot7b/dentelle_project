import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { prenom, nom, email, message } = await req.json();

        if (!prenom || !nom || !email || !message) {
            return NextResponse.json(
                { error: "Tous les champs sont requis." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Adresse email invalide." },
                { status: 400 }
            );
        }

        const res = await fetch("https://next-api.useplunk.com/v1/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.PLUNK_SECRET_KEY}`,
            },
            body: JSON.stringify({
                to: process.env.ADHESION_TO_EMAIL,
                from: process.env.ADHESION_FROM_EMAIL,
                subject: `Nouvelle demande d'adhésion — ${prenom} ${nom}`,
                body: `
                    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #FEF5EB; border: 1px solid #E9BA85;">
                        <h2 style="color: #2C1A0E; font-size: 24px; margin-bottom: 8px;">
                            Nouvelle demande d'adhésion
                        </h2>
                        <p style="color: #9A7558; font-size: 13px; margin-bottom: 28px; font-family: sans-serif;">
                            Les Fuseaux Asseventois — formulaire en ligne
                        </p>
                        <hr style="border: none; border-top: 1px solid #E9BA85; margin-bottom: 28px;" />
                        <table style="width: 100%; border-collapse: collapse; font-family: sans-serif;">
                            <tr>
                                <td style="padding: 10px 16px 10px 0; color: #9A7558; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; vertical-align: top;">Prénom</td>
                                <td style="padding: 10px 0; color: #2C1A0E; font-size: 15px;">${prenom}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 16px 10px 0; color: #9A7558; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; vertical-align: top;">Nom</td>
                                <td style="padding: 10px 0; color: #2C1A0E; font-size: 15px;">${nom}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 16px 10px 0; color: #9A7558; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; vertical-align: top;">Email</td>
                                <td style="padding: 10px 0; font-size: 15px;">
                                    <a href="mailto:${email}" style="color: #C2AE4C;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 16px 10px 0; color: #9A7558; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; vertical-align: top;">Message</td>
                                <td style="padding: 10px 0; color: #2C1A0E; font-size: 15px; line-height: 1.6; white-space: pre-line;">${message}</td>
                            </tr>
                        </table>
                        <hr style="border: none; border-top: 1px solid #E9BA85; margin-top: 28px; margin-bottom: 20px;" />
                        <p style="color: #9A7558; font-size: 12px; font-family: sans-serif; text-align: center;">
                            ✦ Les Fuseaux Asseventois ✦
                        </p>
                    </div>
                `,
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error("Plunk error:", err);
            return NextResponse.json(
                { error: "Erreur lors de l'envoi. Veuillez réessayer." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("API error:", e);
        return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
    }
}
