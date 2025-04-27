export function removeClassesByType(originalString, classType) {
    const regex = new RegExp(`\\b${classType}-\\w+\\s*`, 'g');
    const newString = originalString.replace(regex, '');
    const cleanedString = newString.trim().replace(/\s+/g, ' ');

    return cleanedString;
}
export const clean = function (str = '') {
    if (!str) return ''
    str = str.replace(/\s\s+/g, ' ')
    return [...new Set(str.split(' '))].join(' ')
}
export function toCamelCase(str) {
    return str.replace(/-([a-z])/g, function (match, p1) {
        return p1.toUpperCase();
    });
}
export function getAllFontsFromBlocks(blocks) {
    const fontsSet = new Set();
    function traverseBlocks(blocks) {
        if (Array.isArray(blocks)) {
            blocks.forEach((block) => {
                if (block.font && block.font !== "") {
                    fontsSet.add(block.font);
                }
                if (block.blocks && block.blocks.length > 0) {
                    traverseBlocks(block.blocks);
                }
            });
        } else {
            fontsSet.add(blocks.font);
            if (blocks.blocks && blocks.blocks.length > 0) {
                traverseBlocks(blocks.blocks);
            }
        }
    }
    traverseBlocks(blocks.document);
    return Array.from(fontsSet);
}

export function mergeCSSObjects(obj1, obj2) {
    const mergedObject = { ...obj1 };
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (mergedObject[key]) {
                mergedObject[key] = { ...mergedObject[key], ...obj2[key] };
            } else {
                mergedObject[key] = obj2[key];
            }
        }
    }

    return mergedObject;
}
