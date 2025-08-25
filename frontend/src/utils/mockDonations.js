export const CATEGORIES = ['Food', 'Clothing', 'Books', 'Electronics', 'Furniture', 'Medical', 'Toys', 'Sports']
export const CONDITIONS = ['New', 'Like New', 'Good', 'Fair']

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function makeItem(i) {
  const category = randomFrom(CATEGORIES)
  const condition = randomFrom(CONDITIONS)
  const cities = ['Pune', 'Mumbai', 'Nashik', 'Nagpur', 'Aurangabad']
  const city = randomFrom(cities)
  return {
    id: `D-${1000 + i}`,
    title: `${category} donation ${i+1}`,
    category,
    condition,
    quantity: 1 + (i % 10),
    city,
    createdAt: Date.now() - i * 36e5,
    image: `https://picsum.photos/seed/don-${i}/600/400`,
    description: `Well-kept ${category.toLowerCase()} items in ${condition.toLowerCase()} condition available in ${city}.`
  }
}

export const MOCK_DONATIONS = Array.from({ length: 48 }, (_, i) => makeItem(i))
