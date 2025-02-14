# Cas d'Utilisation : Création de Marque

## Description
Ce cas d'utilisation permet à un utilisateur de créer une nouvelle marque dans le système.

## Acteurs
- Utilisateur

## Préconditions
- L'utilisateur doit être connecté au système.

## Postconditions
- Une nouvelle marque est créée et stockée dans la base de données.

## Flux Principal
1. L'utilisateur navigue vers la page "Créer une Marque".
2. L'utilisateur remplit les détails de la marque (nom, description, statut, image).
3. L'utilisateur soumet le formulaire.
4. Le système valide les entrées.
5. Le système crée la marque et l'enregistre dans la base de données.
6. Le système affiche un message de succès.

## Flux Alternatifs
- Si l'utilisateur soumet des données invalides, le système affiche des messages d'erreur à côté des champs respectifs.

## Exceptions
- Si une erreur de serveur se produit lors du processus de création, le système affiche un message d'erreur.

## Exigences
- Le formulaire doit valider tous les champs avant la soumission.

## Considérations de Test
- Tester la création valide de la marque.
- Tester la gestion des entrées invalides.