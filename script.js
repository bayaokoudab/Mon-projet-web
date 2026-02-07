// Gestion du formulaire de contact
const form = document.getElementById('monFormulaire');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert("Merci ! Votre message a bien été envoyé à la Maison DABIRE.");
        this.reset();
    });
}

// Gestion des boutons Acheter
function commander(nomProduit) {
    let client = prompt("Pour commander votre " + nomProduit + ", veuillez entrer votre nom :");
    if (client) {
        alert("Merci " + client + " ! Votre commande pour [" + nomProduit + "] a été envoyée.");
    }
}

//envoi d'un message dans formspree et génération de pdf
function commanderProduit(nomProduit, prix) {
    // 1. Envoi de l'email via Formspree (en arrière-plan)
    const endpoint = 'https://formspree.io/f/mjgorjbq'; // Ton code Formspree ici
    
    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            commande: nomProduit,
            montant: prix,
            message: `Un client souhaite acheter : ${nomProduit}`
        })
    }).then(response => {
        if (response.ok) {
            console.log("Notification envoyée à Christian");
        }
    });

    // 2. Génération du PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Design de la facture
    doc.setFont("helvetica", "bold");
    doc.setTextColor(212, 175, 55); // Couleur dorée #D4AF37
    doc.text("BIJOUTERIE DABIRE - LUXE", 20, 20);
    
    doc.setDrawColor(212, 175, 55);
    doc.line(20, 25, 190, 25); // Ligne décorative

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("FACTURE PROFORMA", 20, 45);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Désignation : ${nomProduit}`, 20, 60);
    doc.text(`Prix unitaire : ${prix}`, 20, 70);
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 20, 80);
    
    doc.setFont("helvetica", "italic");
    doc.text("Ce document est généré automatiquement suite à votre commande.", 20, 110);

    // Téléchargement
    doc.save(`Facture_Dabire_${nomProduit}.pdf`);
    
    alert("Merci ! Votre commande est transmise et votre facture est prête.");
}

// 1. Fonction pour ouvrir le formulaire quand on clique sur "Acheter"
function commanderProduit(nom, prix) {
    document.getElementById('commandeModal').style.display = "block";
    document.getElementById('modalProduitTitre').innerText = "Achat : " + nom;
    document.getElementById('hiddenProduit').value = nom;
    document.getElementById('hiddenPrix').value = prix;
}

// 2. Fonction pour fermer le formulaire
function fermerModal() {
    document.getElementById('commandeModal').style.display = "none";
}

// 3. Gestion de l'envoi et de la facture
document.getElementById('formCommande').addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = document.getElementById('clientNom').value;
    const email = document.getElementById('clientEmail').value;
    const produit = document.getElementById('hiddenProduit').value;
    const prix = document.getElementById('hiddenPrix').value;
    const numFacture = Math.floor(Math.random() * 9000) + 1000; // Numéro unique

    // ENVOI À TON EMAIL (Via Formspree)
    fetch('https://formspree.io/f/mjgorjbq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _subject: `NOUVELLE COMMANDE : ${nom}`,
            Client: nom,
            Email: email,
            Article: produit,
            Montant: prix,
            Facture_Numero: numFacture
        })
    }).then(() => {
        // GÉNÉRATION DU PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Design Facture
        doc.setFontSize(22);
        doc.setTextColor(212, 175, 55);
        doc.text("BIJOUTERIE DABIRE", 20, 25);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Facture N° : DAB-${numFacture}`, 20, 35);
        doc.text(`Date : ${new Date().toLocaleDateString()}`, 20, 40);

        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text("DESTINATAIRE :", 20, 60);
        doc.text(`${nom}`, 20, 70);
        doc.text(`${email}`, 20, 75);

        doc.text("DÉTAILS DE LA COMMANDE :", 20, 100);
        doc.text(`Produit : ${produit}`, 20, 110);
        doc.text(`Prix Total : ${prix}`, 20, 120);

        doc.save(`Facture_Dabire_${nom}.pdf`);
        
        alert("Merci " + nom + " ! Votre commande est reçue et votre facture est prête.");
        fermerModal();
    });
});

window.onload = function() {
    const btn = document.getElementById('btn-toggle-projet');
    const projetContainer = document.getElementById('mon-projet-complet');

    if (btn && projetContainer) {
        btn.onclick = function() {
            // On vérifie si le projet contient déjà la classe 'show-project'
            const estAffiche = projetContainer.classList.contains('show-project');

            if (!estAffiche) {
                // ACTION : OUVRIR
                projetContainer.classList.add('show-project');
                projetContainer.classList.remove('hidden-project');
                btn.innerHTML = "Refermer le projet ▲";
                btn.style.backgroundColor = "#a36b63"; // Couleur de fermeture
                
                // On descend vers le contenu
                projetContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                // ACTION : FERMER
                projetContainer.classList.remove('show-project');
                projetContainer.classList.add('hidden-project');
                btn.innerHTML = "Voir le projet ▼";
                btn.style.backgroundColor = "#5d3d68"; // Couleur d'origine
                
                // On remonte doucement vers le bouton pour ne pas être perdu
                btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };
    }
};

// On attend que tout le HTML soit chargé avant de chercher les éléments
document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.querySelector('#mobile-menu');
    const navList = document.querySelector('.nav-list'); // Vérifie que c'est bien .nav-list

    // On vérifie si les éléments existent avant d'ajouter l'écouteur
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            console.log("Menu cliqué !"); // Pour vérifier dans la console
        });
    } else {
        console.error("Erreur : #mobile-menu ou .nav-list introuvable dans le HTML");
    }
});