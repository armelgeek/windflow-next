# Cas d'Utilisation : Suppression de Marque

## Description
Ce cas d'utilisation permet à un utilisateur de supprimer une marque existante du système.

## Acteurs
- Utilisateur

## Préconditions
- L'utilisateur doit être connecté au système.
- La marque à supprimer doit exister dans le système.

## Postconditions
- La marque est supprimée de la base de données.

## Flux Principal
1. L'utilisateur navigue vers la page "Liste des Marques".
2. L'utilisateur sélectionne la marque à supprimer.
3. L'utilisateur confirme la suppression.
4. Le système supprime la marque de la base de données.
5. Le système affiche un message de succès.

## Flux Alternatifs
- Si l'utilisateur annule la confirmation, aucune action n'est effectuée.

## Exceptions
- Si une erreur de serveur se produit lors de la suppression, le système affiche un message d'erreur.

## Exigences
- L'utilisateur doit confirmer la suppression avant qu'elle ne soit effectuée.

## Considérations de Test
- Tester la suppression valide de la marque.
- Tester le comportement lors de l'annulation de la suppression.