/**
 * Backend Tests
 * Tests cart, swap, and order functionality
 */

import { backend } from '../utils/backend';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Clear localStorage before tests
const clearStorage = () => {
  localStorage.clear();
};

// Test 1: Add items to cart
export const testAddToCart = async () => {
  clearStorage();
  console.log('📝 Test 1: Add items to cart');
  
  try {
    // Get listings first
    const listings = await backend.getListings();
    console.log('✓ Loaded listings');
    
    // Add first book to cart
    let cart = await backend.addToCart(listings[0].id, 1);
    console.assert(cart.length === 1, 'Cart should have 1 item');
    console.log('✓ Added first book to cart');
    
    // Add second book to cart
    cart = await backend.addToCart(listings[1].id, 2);
    console.assert(cart.length === 2, 'Cart should have 2 items');
    console.log('✓ Added second book to cart');
    
    // Verify quantities
    console.assert(cart[0].quantity === 1, 'First item quantity should be 1');
    console.assert(cart[1].quantity === 2, 'Second item quantity should be 2');
    console.log('✓ Quantities are correct');
    
    console.log('✅ Test 1 PASSED\n');
    return true;
  } catch (err) {
    console.error('❌ Test 1 FAILED:', err.message);
    return false;
  }
};

// Test 2: Remove from cart
export const testRemoveFromCart = async () => {
  clearStorage();
  console.log('📝 Test 2: Remove from cart');
  
  try {
    const listings = await backend.getListings();
    
    // Add two books
    let cart = await backend.addToCart(listings[0].id, 1);
    cart = await backend.addToCart(listings[1].id, 1);
    console.assert(cart.length === 2, 'Cart should have 2 items');
    console.log('✓ Added 2 books to cart');
    
    // Remove first book
    cart = await backend.removeFromCart(listings[0].id);
    console.assert(cart.length === 1, 'Cart should have 1 item after removal');
    console.assert(cart[0].listingId === listings[1].id, 'Remaining item should be the second book');
    console.log('✓ Removed first book from cart');
    
    console.log('✅ Test 2 PASSED\n');
    return true;
  } catch (err) {
    console.error('❌ Test 2 FAILED:', err.message);
    return false;
  }
};

// Test 3: Create order with billing info
export const testCreateOrder = async () => {
  clearStorage();
  console.log('📝 Test 3: Create order with billing info');
  
  try {
    const listings = await backend.getListings();
    
    // Add items to cart
    let cart = await backend.addToCart(listings[0].id, 1);
    cart = await backend.addToCart(listings[1].id, 2);
    console.log('✓ Added items to cart');
    
    // Create order
    const billingInfo = {
      address: '123 Cairo Street, Cairo, Egypt',
      paymentMethod: 'cash'
    };
    
    const order = await backend.createOrder(cart, billingInfo);
    
    console.assert(order.id, 'Order should have an ID');
    console.assert(order.items.length === 2, 'Order should have 2 items');
    console.assert(order.total === (listings[0].price * 1 + listings[1].price * 2), 'Total should be calculated correctly');
    console.assert(order.deliveryAddress === billingInfo.address, 'Address should match');
    console.assert(order.paymentMethod === 'cash', 'Payment method should be cash');
    console.log('✓ Order created with correct details');
    
    // Verify cart is cleared
    const newCart = await backend.getCart();
    console.assert(newCart.length === 0, 'Cart should be empty after order');
    console.log('✓ Cart cleared after order');
    
    console.log('✅ Test 3 PASSED\n');
    return true;
  } catch (err) {
    console.error('❌ Test 3 FAILED:', err.message);
    return false;
  }
};

// Test 4: Check swap eligibility
export const testSwapEligibility = async () => {
  clearStorage();
  console.log('📝 Test 4: Check swap eligibility');
  
  try {
    const listings = await backend.getListings();
    const swapListingId = listings[0].id;
    
    // Check eligibility with user books available
    let eligibility = await backend.getSwapEligibility(swapListingId);
    console.assert(eligibility.eligible === true, 'Should be eligible for swap');
    console.assert(eligibility.availableBooks.length > 0, 'Should have available books');
    console.log('✓ Swap eligible with available books');
    
    // Check eligibility shows correct user books
    const userBooks = await backend.getUserBooks();
    console.assert(eligibility.availableBooks.length === userBooks.length, 'Should show all user books');
    console.log('✓ Available books match user books');
    
    console.log('✅ Test 4 PASSED\n');
    return true;
  } catch (err) {
    console.error('❌ Test 4 FAILED:', err.message);
    return false;
  }
};

// Test 5: Initiate swap
export const testInitiateSwap = async () => {
  clearStorage();
  console.log('📝 Test 5: Initiate swap');
  
  try {
    const listings = await backend.getListings();
    const userBooks = await backend.getUserBooks();
    
    const listingId = listings[0].id;
    const userBookId = userBooks[0].id;
    
    // Initiate swap
    const swap = await backend.initiateSwap(listingId, userBookId);
    
    console.assert(swap.id, 'Swap should have an ID');
    console.assert(swap.listingId === listingId, 'Swap should reference listing');
    console.assert(swap.userBookId === userBookId, 'Swap should reference user book');
    console.assert(swap.status === 'pending', 'Swap status should be pending');
    console.log('✓ Swap initiated successfully');
    
    // Verify swap was recorded in orders
    const orders = await backend.getOrders();
    const swapRecord = orders.find(o => o.id === swap.id);
    console.assert(swapRecord, 'Swap should be recorded in orders');
    console.log('✓ Swap recorded in orders');
    
    console.log('✅ Test 5 PASSED\n');
    return true;
  } catch (err) {
    console.error('❌ Test 5 FAILED:', err.message);
    return false;
  }
};

// Test 6: Full checkout flow
export const testFullCheckoutFlow = async () => {
  clearStorage();
  console.log('📝 Test 6: Full checkout flow (Cart → Billing → Order)');
  
  try {
    const listings = await backend.getListings();
    
    // Step 1: Browse and add to cart
    console.log('  Step 1: Add books to cart');
    let cart = await backend.addToCart(listings[0].id, 1);
    cart = await backend.addToCart(listings[1].id, 1);
    console.assert(cart.length === 2, 'Cart should have 2 books');
    console.log('  ✓ 2 books in cart');
    
    // Step 2: Proceed to checkout (verify cart contents)
    console.log('  Step 2: Verify cart before checkout');
    const preCheckoutCart = await backend.getCart();
    console.assert(preCheckoutCart.length === 2, 'Cart should still have 2 items');
    const totalBefore = preCheckoutCart.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
    console.log(`  ✓ Cart total: ${totalBefore} EGP`);
    
    // Step 3: Submit billing info and create order
    console.log('  Step 3: Submit order with billing info');
    const billingInfo = {
      address: 'Downtown Cairo, Heliopolis, Egypt',
      paymentMethod: 'visa'
    };
    
    const order = await backend.createOrder(preCheckoutCart, billingInfo);
    console.assert(order.id, 'Order should have ID');
    console.assert(order.total === totalBefore, 'Order total should match cart total');
    console.assert(order.paymentMethod === 'visa', 'Payment method should be card');
    console.log('  ✓ Order created with visa payment');
    
    // Step 4: Verify cart is empty after order
    console.log('  Step 4: Verify cart cleared');
    const postCheckoutCart = await backend.getCart();
    console.assert(postCheckoutCart.length === 0, 'Cart should be empty');
    console.log('  ✓ Cart empty after order');
    
    // Step 5: Verify order is in orders list
    console.log('  Step 5: Verify order in database');
    const orders = await backend.getOrders();
    const savedOrder = orders.find(o => o.id === order.id);
    console.assert(savedOrder, 'Order should be saved');
    console.log('  ✓ Order saved successfully');
    
    console.log('✅ Test 6 PASSED\n');
    return true;
  } catch (err) {
    console.error('❌ Test 6 FAILED:', err.message);
    return false;
  }
};

// Test 7: Payment method selection works
export const testPaymentMethods = async () => {
  clearStorage();
  console.log('📝 Test 7: Payment method selection');
  
  try {
    const listings = await backend.getListings();
    
    // Test cash payment
    let cart = await backend.addToCart(listings[0].id, 1);
    const order1 = await backend.createOrder(cart, {
      address: 'Cairo, Egypt',
      paymentMethod: 'cash'
    });
    console.assert(order1.paymentMethod === 'cash', 'Should support cash payment');
    console.log('✓ Cash payment supported');
    
    // Test card payment
    cart = await backend.addToCart(listings[1].id, 1);
    const order2 = await backend.createOrder(cart, {
      address: 'Giza, Egypt',
      paymentMethod: 'visa'
    });
    console.assert(order2.paymentMethod === 'visa', 'Should support visa payment');
    console.log('✓ Visa payment supported');
    
    console.log('✅ Test 7 PASSED\n');
    return true;
  } catch (err) {
    console.error('❌ Test 7 FAILED:', err.message);
    return false;
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log('🧪 Starting Backend Tests Suite\n');
  console.log('═'.repeat(50) + '\n');
  
  const results = [];
  
  results.push(await testAddToCart());
  await sleep(100);
  
  results.push(await testRemoveFromCart());
  await sleep(100);
  
  results.push(await testCreateOrder());
  await sleep(100);
  
  results.push(await testSwapEligibility());
  await sleep(100);
  
  results.push(await testInitiateSwap());
  await sleep(100);
  
  results.push(await testFullCheckoutFlow());
  await sleep(100);
  
  results.push(await testPaymentMethods());
  
  console.log('═'.repeat(50));
  const passed = results.filter(r => r).length;
  const total = results.length;
  console.log(`\n📊 Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('✅ All tests PASSED!');
  } else {
    console.log(`❌ ${total - passed} test(s) failed`);
  }
};
