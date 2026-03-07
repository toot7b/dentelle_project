import type { Metadata } from "next";
import { TransitionLink } from "@/components/transitions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Mentions Légales",
    description: "Informations légales, politique de confidentialité et RGPD de l'association Les Fuseaux Asseventois, dentelle aux fuseaux à Assevent.",
    alternates: {
        canonical: "https://fuseaux-asseventois.fr/mentions-legales",
    },
};

export default function MentionsLegales() {
    const today = new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <main className="min-h-screen bg-[#FEF5EB]">
            <Navbar />

            <div className="container mx-auto px-6 md:px-16 pt-32 md:pt-48 pb-32 max-w-4xl">
                <header className="mb-20">
                    <h1 className="font-neulis text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2C1A0E] mb-4 tracking-tight">
                        Mentions Légales
                    </h1>
                    <p className="font-satoshi text-sm text-[#9A7558]">Dernière mise à jour : {today}</p>
                </header>

                <section className="mb-24">
                    <h2 className="font-neulis text-2xl md:text-3xl font-semibold text-[#2C1A0E] mb-8">
                        1. ÉDITEUR DU SITE
                    </h2>
                    <div className="font-satoshi text-lg text-[#5C3D26] space-y-4 leading-relaxed">
                        <p>Le présent site, accessible à l&apos;adresse <span className="text-[#C2AE4C]">fuseaux-asseventois.fr</span>, est édité par :</p>
                        <p>
                            <strong>Les Fuseaux Asseventois</strong>, association loi 1901.<br />
                            Immatriculée sous le numéro SIRET 795 068 352 00017.<br />
                            <strong>Adresse :</strong> 16 rue Georges Guynemer, 59600 Assevent, France.<br />
                            <strong>Email :</strong> <a href="mailto:contact@fuseaux-asseventois.fr" className="text-[#C2AE4C] hover:underline">contact@fuseaux-asseventois.fr</a><br />
                            <strong>Directeur de la publication :</strong> Martine Seris.
                        </p>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="font-neulis text-2xl md:text-3xl font-semibold text-[#2C1A0E] mb-8">
                        2. HÉBERGEMENT ET NOM DE DOMAINE
                    </h2>
                    <div className="font-satoshi text-lg text-[#5C3D26] space-y-8 leading-relaxed">
                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">Hébergement :</h3>
                            <p>
                                Le site est hébergé par <strong>Scaleway SAS</strong>.<br />
                                Siège social : 8 rue de la Ville l’Evêque, 75008 Paris, France.<br />
                                Téléphone : +33 (0)1 84 13 00 00<br />
                                Site web : <a href="https://www.scaleway.com" target="_blank" rel="noopener noreferrer" className="text-[#C2AE4C] hover:underline">www.scaleway.com</a>
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">Nom de domaine :</h3>
                            <p>
                                Le nom de domaine est enregistré via <strong>OVH SAS</strong>.<br />
                                Siège social : 2 rue Kellermann, 59100 Roubaix, France.<br />
                                Site web : <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-[#C2AE4C] hover:underline">www.ovhcloud.com</a>
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="font-neulis text-2xl md:text-3xl font-semibold text-[#2C1A0E] mb-8">
                        3. PROPRIÉTÉ INTELLECTUELLE
                    </h2>
                    <div className="font-satoshi text-lg text-[#5C3D26] space-y-6 leading-relaxed">
                        <p>
                            L&apos;ensemble des éléments présents sur le site (textes, images, graphismes, logo, animations, etc.) sont la propriété exclusive de l&apos;association <strong>Les Fuseaux Asseventois</strong>, sauf mention contraire.
                        </p>
                        <p>
                            <strong>Crédits photographiques :</strong> Les photos présentes sur le site sont issues du club Les Fuseaux Asseventois et restent leur propriété exclusive.
                        </p>
                        <p>
                            Toute reproduction, représentation, modification, publication ou adaptation des contenus (textes, images, logo) sans autorisation écrite préalable reste strictement interdite.
                        </p>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="font-neulis text-2xl md:text-3xl font-semibold text-[#2C1A0E] mb-8">
                        4. RESPONSABILITÉ
                    </h2>
                    <div className="font-satoshi text-lg text-[#5C3D26] space-y-6 leading-relaxed">
                        <p>
                            L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur le site. Toutefois, il ne saurait être tenu responsable :
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>des erreurs ou omissions dans les contenus mis à disposition,</li>
                            <li>des interruptions ou dysfonctionnements du site,</li>
                            <li>ou de tout dommage direct ou indirect résultant de l&apos;accès ou de l&apos;utilisation du site.</li>
                        </ul>
                        <p>L&apos;utilisateur accède au site sous sa seule responsabilité.</p>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="font-neulis text-2xl md:text-3xl font-semibold text-[#2C1A0E] mb-8">
                        5. PROTECTION DES DONNÉES PERSONNELLES (RGPD)
                    </h2>
                    <div className="font-satoshi text-lg text-[#5C3D26] space-y-10 leading-relaxed">
                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">5.1. Responsable du traitement</h3>
                            <p>Le responsable du traitement des données collectées sur ce site est :<br />
                                Les Fuseaux Asseventois – <a href="mailto:contact@fuseaux-asseventois.fr" className="text-[#C2AE4C] hover:underline">contact@fuseaux-asseventois.fr</a></p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">5.2. Données collectées</h3>
                            <p>Le site collecte uniquement les données transmises via le formulaire d&apos;adhésion : Nom, Prénom, E-mail, Message libre.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">5.3. Finalité du traitement</h3>
                            <p>Les données sont utilisées exclusivement pour répondre aux demandes d&apos;adhésion et de contact. Elles ne font l&apos;objet d&apos;aucune cession ni utilisation commerciale.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">5.4. Base légale du traitement</h3>
                            <p>Le traitement repose sur le consentement de l&apos;utilisateur (article 6.1.a du RGPD).</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">5.5. Durée de conservation</h3>
                            <p>Les données ne sont pas stockées par le site. Elles transitent via <strong>Plunk</strong> pour l&apos;envoi d&apos;e-mails, puis sont conservées dans la boîte e-mail de l&apos;association pendant la durée nécessaire au traitement, sans dépasser 3 ans après le dernier échange.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">5.6. Destinataires</h3>
                            <p>Le service tiers <strong>Plunk</strong> (transmisson par e-mail) traite les données uniquement pour permettre l&apos;acheminement des messages. Aucune donnée n&apos;est vendue à des fins commerciales.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">5.7. Sécurité et hébergement</h3>
                            <p>L&apos;ensemble des communications bénéficie d&apos;un chiffrement HTTPS et de mesures de sécurité conformes aux standards européens pour assurer la protection de vos échanges.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="font-neulis text-2xl md:text-3xl font-semibold text-[#2C1A0E] mb-8">
                        6. DROITS DE L&apos;UTILISATEUR
                    </h2>
                    <div className="font-satoshi text-lg text-[#5C3D26] space-y-6 leading-relaxed">
                        <p>Chaque utilisateur dispose des droits d&apos;accès, de rectification, d&apos;opposition, d&apos;effacement et de portabilité de ses données.</p>
                        <p>Pour exercer ces droits, adressez votre demande à : <a href="mailto:contact@fuseaux-asseventois.fr" className="text-[#C2AE4C] hover:underline">contact@fuseaux-asseventois.fr</a>. Une réponse sera apportée dans un délai maximum de 30 jours.</p>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="font-neulis text-2xl md:text-3xl font-semibold text-[#2C1A0E] mb-8">
                        7. COOKIES
                    </h2>
                    <div className="font-satoshi text-lg text-[#5C3D26] space-y-4 leading-relaxed">
                        <p>Ce site n&apos;utilise aucun cookie de traçage ou de profilage publicitaire. Seuls des cookies techniques essentiels au bon fonctionnement du site peuvent être déposés.</p>
                        <p>Vous pouvez configurer votre navigateur pour bloquer les cookies à tout moment.</p>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="font-neulis text-2xl md:text-3xl font-semibold text-[#2C1A0E] mb-8">
                        8. CRÉDITS
                    </h2>
                    <div className="font-satoshi text-lg text-[#5C3D26] space-y-8 leading-relaxed">
                        <p>
                            <strong>Design, Animations & Développement :</strong> Thomas Sarazin (SIRET 992 780 635 00010) — bigxbang studio / nualt studio.
                        </p>
                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">Ressources graphiques :</h3>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Icônes : Lucide React</li>
                                <li>Animations : GSAP (GreenSock)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#2C1A0E] mb-2">Polices :</h3>
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Neulis :</strong> Créée par Adam Ladd (Adam Ladd Design).</li>
                                <li><strong>Satoshi :</strong> Mise à disposition par Fontshare (Indian Type Foundry).</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="font-neulis text-2xl md:text-3xl font-semibold text-[#2C1A0E] mb-8">
                        9. MODIFICATION DU DOCUMENT
                    </h2>
                    <div className="font-satoshi text-lg text-[#5C3D26] leading-relaxed">
                        <p>Les présentes mentions légales peuvent être mises à jour à tout moment pour tenir compte d&apos;évolutions légales, techniques ou éditoriales.</p>
                    </div>
                </section>

                <div className="mt-48 mb-20">
                    <div className="flex items-center justify-center mb-16">
                        <div className="flex-1 h-px bg-[#C2AE4C]/50" />
                        <span className="mx-4 text-[#C2AE4C]/70 text-xs">✦</span>
                        <div className="flex-1 h-px bg-[#C2AE4C]/50" />
                    </div>

                    <div className="flex justify-center">
                        <TransitionLink
                            href="/"
                            className="font-satoshi text-sm font-medium px-8 py-3 rounded-full bg-[#2C1A0E] text-[#FEF5EB] hover:bg-[#5C3D26] transition-colors duration-300"
                        >
                            Retour à l&apos;accueil
                        </TransitionLink>
                    </div>
                </div>
            </div>

            <Footer hideSeparator />
        </main>
    );
}
