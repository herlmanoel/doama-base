////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering
import { Donor } from './data';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Product data
export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Products'
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  // Get a specific product by its ID
  async getProductById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product
    };
  }
};

// Initialize sample products
fakeProducts.initialize();

// Mock donor data store
export const fakeDonors = {
  records: [] as Donor[],

  initialize() {
    const sampleDonors: Donor[] = [];
    function generateRandomDonorData(id: number): Donor {
      const dateOfBirth = faker.date.birthdate({ min: 18, max: 45, mode: 'age' });
      const birthDate = faker.date.recent({ days: 365 }); // Child born in the last year

      return {
        id,
        registrationDate: faker.date.past().toISOString(),
        fullName: faker.person.fullName(),
        dateOfBirth: dateOfBirth.toISOString(),
        profession: faker.person.jobTitle(),
        address: faker.location.streetAddress(true),
        city: faker.location.city(),
        neighborhood: faker.location.secondaryAddress(),
        referencePoint: faker.lorem.sentence(),
        landline: faker.phone.number(),
        mobile: faker.phone.number(),
        prenatalCare: faker.lorem.sentence(),
        doctorName: faker.person.fullName(),
        gestationalAge: `${faker.number.int({ min: 37, max: 42 })} semanas`,
        birthType: faker.helpers.arrayElement(['normal', 'cesarean']),
        birthDate: birthDate.toISOString(),
        complications: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 }),
        vdrl: faker.helpers.arrayElement(['reagente', 'nao-reagente']),
        hbsag: faker.helpers.arrayElement(['positivo', 'negativo']),
        ftaAbs: faker.helpers.arrayElement(['positivo', 'negativo']),
        hiv: faker.helpers.arrayElement(['positivo', 'negativo']),
        transfusion: faker.helpers.arrayElement(['sim', 'nao']),
        tattoo: faker.helpers.arrayElement(['sim', 'nao']),
        tattooDetails: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.2 }),
        piercing: faker.helpers.arrayElement(['sim', 'nao']),
        piercingDetails: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.2 }),
        smoker: faker.helpers.arrayElement(['sim', 'nao']),
        alcohol: faker.helpers.arrayElement(['sim', 'nao']),
        drugs: faker.helpers.arrayElement(['sim', 'nao']),
        drugDetails: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.1 }),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.recent().toISOString(),
      };
    }

    for (let i = 1; i <= 20; i++) {
      sampleDonors.push(generateRandomDonorData(i));
    }

    this.records = sampleDonors;
  },

  async getAll({ search }: { search?: string }) {
    let donors = [...this.records];

    if (search) {
      donors = matchSorter(donors, search, {
        keys: ['fullName', 'email', 'address']
      });
    }

    return donors;
  },

  async getDonors({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    await delay(1000);
    const allDonors = await this.getAll({ search });
    const totalDonors = allDonors.length;

    const offset = (page - 1) * limit;
    const paginatedDonors = allDonors.slice(offset, offset + limit);

    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: 'Sample donor data for testing',
      total_donors: totalDonors,
      offset,
      limit,
      donors: paginatedDonors
    };
  },

  async getDonorById(id: number) {
    await delay(1000);

    const donor = this.records.find((d) => d.id === id);

    if (!donor) {
      return {
        success: false,
        message: `Donor with ID ${id} not found`
      };
    }

    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Donor with ID ${id} found`,
      donor
    };
  }
};

// Initialize sample donors
fakeDonors.initialize();
