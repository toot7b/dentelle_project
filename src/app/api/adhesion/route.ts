import { NextRequest, NextResponse } from "next/server";

const SWEEGO_URL = "https://api.sweego.io/send";

async function sendEmail(to: string, subject: string, html: string) {
    const res = await fetch(SWEEGO_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Api-Key": process.env.SWEEGO_API_KEY!,
        },
        body: JSON.stringify({
            channel: "email",
            provider: "sweego",
            recipients: [{ email: to }],
            from: {
                name: process.env.ADHESION_FROM_NAME,
                email: process.env.ADHESION_FROM_EMAIL,
            },
            subject,
            "message-html": html,
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("Sweego error:", err);
        throw new Error(`Sweego error: ${res.status}`);
    }

    return res;
}

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

        // 1. Notification à l'association
        const notificationHtml = `
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <!-- En-tête crème avec nom de l'asso -->
                <div style="background-color: #FEF5EB; padding: 32px 32px 24px; text-align: center; border-bottom: 2px solid #C2AE4C;">
                    <p style="font-family: Georgia, serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C2AE4C; margin: 0 0 8px;">
                        ✦ Les Fuseaux Asseventois ✦
                    </p>
                    <h1 style="font-family: Georgia, serif; font-size: 22px; color: #2C1A0E; margin: 0;">
                        Nouvelle demande d'adhésion
                    </h1>
                </div>

                <!-- Contenu -->
                <div style="padding: 32px; font-family: -apple-system, sans-serif;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 14px 16px; background-color: #FEF5EB; color: #9A7558; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; width: 100px; vertical-align: top; border-bottom: 1px solid #F0DBD8;">Prénom</td>
                            <td style="padding: 14px 16px; color: #2C1A0E; font-size: 15px; border-bottom: 1px solid #F0DBD8;">${prenom}</td>
                        </tr>
                        <tr>
                            <td style="padding: 14px 16px; background-color: #FEF5EB; color: #9A7558; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top; border-bottom: 1px solid #F0DBD8;">Nom</td>
                            <td style="padding: 14px 16px; color: #2C1A0E; font-size: 15px; border-bottom: 1px solid #F0DBD8;">${nom}</td>
                        </tr>
                        <tr>
                            <td style="padding: 14px 16px; background-color: #FEF5EB; color: #9A7558; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top; border-bottom: 1px solid #F0DBD8;">Email</td>
                            <td style="padding: 14px 16px; font-size: 15px; border-bottom: 1px solid #F0DBD8;">
                                <a href="mailto:${email}" style="color: #C2AE4C; text-decoration: none;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 14px 16px; background-color: #FEF5EB; color: #9A7558; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Message</td>
                            <td style="padding: 14px 16px; color: #2C1A0E; font-size: 15px; line-height: 1.6; white-space: pre-line;">${message}</td>
                        </tr>
                    </table>
                </div>

                <!-- Pied -->
                <div style="background-color: #FEF5EB; padding: 20px 32px; text-align: center; border-top: 1px solid #E9BA85;">
                    <p style="font-family: Georgia, serif; font-size: 11px; color: #9A7558; margin: 0;">
                        Formulaire en ligne — fuseaux-asseventois.fr
                    </p>
                </div>
            </div>
        `;

        await sendEmail(
            process.env.ADHESION_TO_EMAIL!,
            `Nouvelle demande d'adhésion — ${prenom} ${nom}`,
            notificationHtml
        );

        // 2. Confirmation à la personne
        const confirmationHtml = `
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <!-- En-tête -->
                <div style="background-color: #FEF5EB; padding: 36px 32px; text-align: center; border-bottom: 2px solid #C2AE4C;">
                    <p style="font-family: Georgia, serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C2AE4C; margin: 0 0 12px;">
                        ✦ Les Fuseaux Asseventois ✦
                    </p>
                    <h1 style="font-family: Georgia, serif; font-size: 22px; color: #2C1A0E; margin: 0;">
                        Merci, ${prenom} !
                    </h1>
                </div>

                <!-- Corps du message -->
                <div style="padding: 36px 32px; font-family: -apple-system, sans-serif;">
                    <p style="color: #2C1A0E; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
                        Nous avons bien reçu votre demande d'adhésion et nous vous en remercions chaleureusement.
                    </p>
                    <p style="color: #2C1A0E; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
                        Un membre de notre association reviendra vers vous très prochainement pour la suite des démarches.
                    </p>
                    <p style="color: #5C3D26; font-size: 15px; line-height: 1.8; margin: 0; font-family: Georgia, serif; font-style: italic;">
                        À très bientôt autour des fuseaux !
                    </p>
                </div>

                <!-- Séparateur doré -->
                <div style="padding: 0 32px;">
                    <div style="border-top: 1px dashed #C2AE4C; opacity: 0.5;"></div>
                </div>

                <!-- Pied -->
                <div style="padding: 24px 32px; text-align: center;">
                    <p style="font-family: Georgia, serif; font-size: 11px; color: #9A7558; margin: 0 0 4px;">
                        Les Fuseaux Asseventois
                    </p>
                    <p style="font-family: -apple-system, sans-serif; font-size: 11px; color: #9A7558; margin: 0;">
                        fuseaux-asseventois.fr
                    </p>
                </div>
            </div>
        `;

        await sendEmail(
            email,
            "Votre demande d'adhésion — Les Fuseaux Asseventois",
            confirmationHtml
        );

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("API error:", e);
        return NextResponse.json({ error: "Erreur lors de l'envoi. Veuillez réessayer." }, { status: 500 });
    }
}
