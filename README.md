# TaskMaster

TaskMaster est une application de gestion des tâches développée avec React, TypeScript, Zustand et TailwindCSS. Elle permet aux utilisateurs d'ajouter, modifier, supprimer et gérer leurs tâches facilement.

## Table des Matières

- [Technologies Utilisées](#technologies-utilisées)
- [Structure de l'Application](#structure-de-lapplication)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Tests](#tests)
- [Contributions](#contributions)
- [Licence](#licence)

## Technologies Utilisées

- **React** : Librairie JavaScript pour construire des interfaces utilisateur.
- **TypeScript** : Superset de JavaScript qui ajoute des types statiques.
- **Zustand** : Bibliothèque de gestion d'état simple et flexible.
- **TailwindCSS** : Framework CSS utilitaire pour une conception rapide et réactive.
- **React Testing Library** et **Jest** : Outils de tests pour assurer la qualité du code et la couverture des tests.

## Structure de l'Application

L'application est structurée de la manière suivante :

src
│ ├── /components # Composants réutilisables
│ ├── TaskItem.tsx # Représente une tâche individuelle
│ ├── TaskList.tsx # Liste de toutes les tâches
│ └── Notification.tsx # Affiche des notifications
│ ├── /hooks # Hooks personnalisés
│ └── useTaskStore.ts # Store Zustand pour la gestion des tâches
│ ├── /pages # Pages principales de l'application
│ └── TaskManager.tsx # Page principale de gestion des tâches
│ ├── /styles # Styles globaux et personnalisés
│ └── tailwind.css # Fichier de configuration de TailwindCSS
│ ├── App.tsx # Composant principal de l'application
└── index.tsx # Point d'entrée de l'application

### Choix Techniques

- **Zustand pour la Gestion d'État** : Zustand a été choisi pour sa simplicité et sa légèreté, permettant une gestion d'état sans le besoin d'une architecture complexe comme Redux.
- **TypeScript pour la Sécurité Typée** : TypeScript aide à prévenir les erreurs courantes de développement grâce à la vérification des types, ce qui améliore la maintenabilité du code.

- **TailwindCSS pour le Style** : L'utilisation de TailwindCSS permet de créer des interfaces réactives et personnalisables rapidement avec des classes utilitaires.

## Fonctionnalités

- Ajouter une nouvelle tâche
- Modifier une tâche existante
- Supprimer une tâche par drag left ou right.
- Afficher les tâches dans une liste
- Notifications pour les actions réussies ou échouées

## Installation

Pour installer et exécuter l'application, suivez ces étapes :

1. Clonez le dépôt :

   ```
   git clone git@github.com:Aripfizer/TaskMaster.git

   ```

2. Accédez au dossier du projet :

```
cd TaskMaster

```

3. Installez les dépendances :

```
npm install

```

4. Démarrez l'application :

```
npm run dev

```

## Tests

L'application utilise Jest et React Testing Library pour les tests. Pour exécuter les tests, utilisez :

```
npm run test

```

## Contributions

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir des problèmes ou des pull requests pour améliorer le projet.

## Licence

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.
