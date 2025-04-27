// Create a random ID
function randomID() {
    return 'tail-editor-' + Math.random().toString(36).substr(2, 5);
}

// Clone object and reassign any id to a new random id
const traverse = function (o: any): any {
    for (const i in o) {
        if (o[i] !== null && typeof (o[i]) === "object") {
            traverse(o[i]);
        } else if (i === 'id') {
            o[i] = randomID();
        }
    }
    return o;
};

// Find a node by ID and remove (flag remove)
function removeElement(id: string, currentNode: any): any {
    if (id === currentNode.id) {
        return currentNode;
    } else {
        let node = null;
        for (const index in currentNode.blocks) {
            node = currentNode.blocks[index];
            if (node.id === id) {
                currentNode.blocks.splice(parseInt(index), 1);
                node.parent = currentNode;
                return node;
            }
            removeElement(id, node);
        }
        return node;
    }
}

export function updateBlockContainer(blocks: any[], currentId: string, modified: string): void {
    blocks.forEach((block) => {
        if (block.id === currentId) {
            block.css.container = modified;
        }
        if (block.blocks && block.blocks.length > 0) {
            updateBlockContainer(block.blocks, currentId, modified);
        }
    });
}

export function updateStyles(document: any, currentId: string, css: string, obj: any): void {
    console.log('currentId', currentId);
    function checkAndUpdate(block: any): boolean {
        if (block.id === currentId) {
            block.css.css = css;
            block.cssObject = obj;
            return true;
        }
        return false;
    }
    if (checkAndUpdate(document)) {
        return;
    }
    function recursiveUpdate(blocks: any[]): void {
        for (const block of blocks) {
            if (checkAndUpdate(block)) {
                return;
            }
            if (block.blocks && block.blocks.length > 0) {
                recursiveUpdate(block.blocks);
            }
        }
    }
    if (document.blocks && document.blocks.length > 0) {
        recursiveUpdate(document.blocks);
    }
}

export const flattenObject = (nestedObj: any, prefix = ''): any => {
    return Object.keys(nestedObj).reduce((acc: any, key: string) => {
        const newKey = `${prefix}`;
        if (typeof nestedObj[key] === 'object' && nestedObj[key] !== null) {
            return { ...acc, ...flattenObject(nestedObj[key], `${newKey}.`) };
        } else {
            return { ...acc, [newKey]: nestedObj[key] };
        }
    }, {});
};

export function updateBlockProperty(blocks: any[], currentId: string, propertyPath: string, modified: any): void {
    const propertyParts = propertyPath.split('.');
    blocks.forEach((block) => {
        if (block.id === currentId) {
            let currentLevel = block;
            for (let i = 0; i < propertyParts.length - 1; i++) {
                currentLevel = currentLevel[propertyParts[i]];
            }
            currentLevel[propertyParts[propertyParts.length - 1]] = modified;
        }
        if (block.blocks && block.blocks.length > 0) {
            updateBlockProperty(block.blocks, currentId, propertyPath, modified);
        }
    });
}

export function modifyBlockProperty(blocks: any[], currentId: string, modified: any, property: string): void {
    blocks.forEach((block) => {
        if (block.id === currentId) {
            let properties = property.split('.');
            let currentObject = block;
            for (let prop of properties.slice(0, -1)) {
                currentObject[prop] = currentObject[prop] || {};
                currentObject = currentObject[prop];
            }
            currentObject[properties[properties.length - 1]] = modified;
        }
        if (block.blocks && block.blocks.length > 0) {
            modifyBlockProperty(block.blocks, currentId, modified, property);
        }
    });
}

export function moveBlockAction(blocks: any[], currentId: string, direction: string): void {
    let targetIndex = -1;
    blocks.forEach((block, index) => {
        if (block.id === currentId) {
            targetIndex = index;
        }
        if (block.blocks && block.blocks.length > 0) {
            moveBlockAction(block.blocks, currentId, direction);
        }
    });
    if (targetIndex !== -1) {
        if (direction === "up" && targetIndex > 0) {
            const temp = blocks[targetIndex];
            blocks[targetIndex] = blocks[targetIndex - 1];
            blocks[targetIndex - 1] = temp;
        } else if (direction === "down" && targetIndex < blocks.length - 1) {
            const temp = blocks[targetIndex];
            blocks[targetIndex] = blocks[targetIndex + 1];
            blocks[targetIndex + 1] = temp;
        }
    }
}

export function duplicateBlockAction(blocks: any[], current: any, duplicatedBlock: any): void {
    blocks.forEach((block, index) => {
        if (block.id === current.id) {
            blocks.splice(index + 1, 0, duplicatedBlock);
        }
        if (block.blocks && block.blocks.length > 0) {
            duplicateBlockAction(block.blocks, current, duplicatedBlock);
        }
    });
}

export function duplicateData(current: any): any {
    const duplicating = (block: any): any => {
        const duplicate = { ...block };
        duplicate.id = randomID();
        if (duplicate.blocks && duplicate.blocks.length > 0) {
            duplicate.blocks = duplicate.blocks.map(duplicating);
        }
        return duplicate;
    };
    return duplicating(current);
}

function findBlockById(blocks: any[], currentId: string): any | null {
    for (const block of blocks) {
        if (block.id === currentId) {
            return block;
        }
        if (block.blocks && block.blocks.length > 0) {
            const childBlock = findBlockById(block.blocks, currentId);
            if (childBlock) {
                return childBlock;
            }
        }
    }
    return null;
}

export function navigateToParentAction(blocks: any[], currentId: string): any | null {
    for (const block of blocks) {
        const childBlock = findBlockById(block.blocks, currentId);
        if (childBlock) {
            return block;
        }
        if (block.blocks && block.blocks.length > 0) {
            const parentBlock = navigateToParentAction(block.blocks, currentId);
            if (parentBlock) {
                return parentBlock;
            }
        }
    }
    return null;
}

export function updateBlockIcon(blocks: any[], currentId: string, modified: string): void {
    blocks.forEach((block) => {
        if (block.id === currentId) {
            block.data.icon = modified;
        }
        if (block.blocks && block.blocks.length > 0) {
            updateBlockIcon(block.blocks, currentId, modified);
        }
    });
}

export function removeNestedObjectsKey(currentNode: any = {}, arrayKey: string[] = [], deleteKey: string = ''): any {
    delete currentNode[deleteKey];
    currentNode[arrayKey].forEach((obj: any) => {
        removeNestedObjectsKey(obj, arrayKey, deleteKey);
    });
    return currentNode;
}

export function manageObjectInArray(arr: any[], object: any): any[] {
    const index = arr.findIndex((item) => item.id === object.id);
    if (index === -1) {
        arr.push(object);
    } else {
        arr.splice(index, 1);
    }
    return arr;
}

export function filterBlocksRecursive(blocks: any[], currentId: string): any[] {
    return blocks.filter((block) => {
        if (block.id === currentId) {
            return false;
        }
        if (block.blocks && block.blocks.length > 0) {
            block.blocks = filterBlocksRecursive(block.blocks, currentId);
        }
        return true;
    });
}
