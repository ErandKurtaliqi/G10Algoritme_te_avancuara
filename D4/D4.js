function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ") 
    .replace(/\bgb\b/g, "gb")    
    .replace(/\bcolor\b/g, "")   
    .replace(/\s+/g, " ")
    .trim();
}

function makeKey(product) {
  const { brand, model, description } = product;
  return normalize(`${brand} ${model} ${description}`);
}

function findDuplicateProducts(existingInventory, newProducts) {
  const hashTable = new Map(); 

  for (const [id, product] of Object.entries(existingInventory)) {
    const key = makeKey(product);
    if (!hashTable.has(key)) {
      hashTable.set(key, []);
    }
    hashTable.get(key).push({ id, ...product });
  }

  const duplicateGroups = [];
  const newUniqueProducts = [];

  for (const [id, product] of Object.entries(newProducts)) {
    const key = makeKey(product);

    if (hashTable.has(key)) {
      hashTable.get(key).push({ id, ...product });
    } else {
      let matchedKey = null;

      for (const existingKey of hashTable.keys()) {
        const overlap = normalize(existingKey).includes(normalize(product.model))
          || normalize(existingKey).includes(normalize(product.brand))
          || normalize(existingKey).includes(normalize(product.description));

        if (overlap) {
          matchedKey = existingKey;
          break;
        }
      }

      if (matchedKey) {
        hashTable.get(matchedKey).push({ id, ...product });
      } else {
        newUniqueProducts.push({ id, ...product });
      }
    }
  }

  for (const [key, group] of hashTable.entries()) {
    if (group.length > 1) {
      duplicateGroups.push({
        name: key,
        items: group.map(p => `${p.id} (Supplier: ${p.supplier})`),
        confidence: "HIGH"
      });
    }
  }

  return { duplicateGroups, newUniqueProducts };
}

const existingInventory = {
  PROD001: { brand: "Samsung", model: "Galaxy S21", description: "128GB Black", supplier: "SUP-A" },
  PROD002: { brand: "Apple", model: "iPhone 13", description: "256GB Blue", supplier: "SUP-A" },
  PROD003: { brand: "Sony", model: "WH-1000XM4", description: "Noise Cancelling Headphones Black", supplier: "SUP-B" }
};

const newProducts = {
  NEW001: { brand: "SAMSUNG", model: "Galaxy S21", description: "128 GB - Black Color", supplier: "SUP-C" },
  NEW002: { brand: "Apple", model: "iPhone 13 Pro", description: "256GB Gold", supplier: "SUP-D" },
  NEW003: { brand: "Sony", model: "WH1000XM4", description: "Noise-Cancelling Headphones (Black)", supplier: "SUP-C" },
  NEW004: { brand: "LG", model: "OLED TV 55", description: "55 inch 4K", supplier: "SUP-D" }
};

const results = findDuplicateProducts(existingInventory, newProducts);

console.log("DUPLICATE GROUPS FOUND:");
results.duplicateGroups.forEach(g => {
  console.log(`Group: ${g.name}`);
  g.items.forEach(item => console.log(" - " + item));
  console.log(`Confidence: ${g.confidence}\n`);
});

console.log("NEW UNIQUE PRODUCTS:");
results.newUniqueProducts.forEach(p =>
  console.log(` - ${p.id} (${p.brand} ${p.model})`)
);