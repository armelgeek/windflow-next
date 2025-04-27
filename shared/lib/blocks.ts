export const setupBlocks = (editor) => {
    editor.BlockManager.add('hero-section', {
        label: 'Hero Section',
        content: `
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-5xl font-bold mb-6">Welcome to Our Website</h1>
                    <p className="text-lg mb-6">
                    This is a hero section with a text and a button. You can edit this text and replace it with your own content.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
                    Get Started
                    </button>
                </div>
                <div className="md:w-1/2">
                    <img
                    src="https://via.placeholder.com/600x400"
                    alt="Hero Image"
                    className="w-full h-auto rounded-lg"
                    />
                </div>
                </div>
            </div>
        </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('gallery-section', {
        label: 'Gallery Section',
        content: `
        <section class="py-16 bg-gray-100">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-2">Our Gallery</h2>
                <p class="text-lg text-gray-600">Check out our latest work</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <img src="https://via.placeholder.com/600x400" alt="Gallery Image" class="w-full h-[250px] object-cover rounded-lg shadow-md" />
                <img src="https://via.placeholder.com/600x400" alt="Gallery Image" class="w-full h-[250px] object-cover rounded-lg shadow-md" />
                <img src="https://via.placeholder.com/600x400" alt="Gallery Image" class="w-full h-[250px] object-cover rounded-lg shadow-md" />
                <img src="https://via.placeholder.com/600x400" alt="Gallery Image" class="w-full h-[250px] object-cover rounded-lg shadow-md" />
                <img src="https://via.placeholder.com/600x400" alt="Gallery Image" class="w-full h-[250px] object-cover rounded-lg shadow-md" />
                <img src="https://via.placeholder.com/600x400" alt="Gallery Image" class="w-full h-[250px] object-cover rounded-lg shadow-md" />
                </div>
            </div>
            </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('services-section', {
        label: 'Services Section',
        content: `
        <section class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4">Our Services</h2>
                <p class="text-lg text-gray-600">We offer a wide range of services to meet your needs</p>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Service Card 1 -->
                <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-8 text-center">
                    <div class="text-5xl text-blue-600 mb-5">
                    <i class="fas fa-laptop-code"></i>
                    </div>
                    <h3 class="text-2xl font-semibold mb-4">Web Development</h3>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt.</p>
                    <a href="#" class="inline-block mt-5 text-blue-600 border border-blue-600 px-5 py-2 rounded hover:bg-blue-600 hover:text-white transition">
                    Learn More
                    </a>
                </div>

                <!-- Service Card 2 -->
                <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-8 text-center">
                    <div class="text-5xl text-blue-600 mb-5">
                    <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3 class="text-2xl font-semibold mb-4">Mobile App Development</h3>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt.</p>
                    <a href="#" class="inline-block mt-5 text-blue-600 border border-blue-600 px-5 py-2 rounded hover:bg-blue-600 hover:text-white transition">
                    Learn More
                    </a>
                </div>

                <!-- Service Card 3 -->
                <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-8 text-center">
                    <div class="text-5xl text-blue-600 mb-5">
                    <i class="fas fa-search"></i>
                    </div>
                    <h3 class="text-2xl font-semibold mb-4">SEO Services</h3>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt.</p>
                    <a href="#" class="inline-block mt-5 text-blue-600 border border-blue-600 px-5 py-2 rounded hover:bg-blue-600 hover:text-white transition">
                    Learn More
                    </a>
                </div>
                </div>
            </div>
        </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('blog-section', {
        label: 'Blog Section',
        content: `
        <section class="py-16 bg-gray-100">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4">Latest Blog Posts</h2>
                <p class="text-lg text-gray-600">Stay updated with our latest news and articles</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Blog Card 1 -->
                <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden h-full">
                    <img src="https://via.placeholder.com/600x400" alt="Blog Image" class="w-full h-64 object-cover">
                    <div class="p-6">
                    <div class="flex justify-between items-center text-sm mb-3">
                        <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">Technology</span>
                        <span class="text-gray-500">March 5, 2025</span>
                    </div>
                    <h4 class="text-xl font-semibold mb-3">The Future of Web Development</h4>
                    <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.</p>
                    <a href="#" class="text-blue-600 hover:underline font-medium">Read More →</a>
                    </div>
                </div>

                <!-- Blog Card 2 -->
                <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden h-full">
                    <img src="https://via.placeholder.com/600x400" alt="Blog Image" class="w-full h-64 object-cover">
                    <div class="p-6">
                    <div class="flex justify-between items-center text-sm mb-3">
                        <span class="bg-green-600 text-white px-3 py-1 rounded-full text-xs">Design</span>
                        <span class="text-gray-500">March 8, 2025</span>
                    </div>
                    <h4 class="text-xl font-semibold mb-3">UI/UX Design Trends for 2025</h4>
                    <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.</p>
                    <a href="#" class="text-blue-600 hover:underline font-medium">Read More →</a>
                    </div>
                </div>

                <!-- Blog Card 3 -->
                <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden h-full">
                    <img src="https://via.placeholder.com/600x400" alt="Blog Image" class="w-full h-64 object-cover">
                    <div class="p-6">
                    <div class="flex justify-between items-center text-sm mb-3">
                        <span class="bg-red-600 text-white px-3 py-1 rounded-full text-xs">Marketing</span>
                        <span class="text-gray-500">March 10, 2025</span>
                    </div>
                    <h4 class="text-xl font-semibold mb-3">Digital Marketing Strategies</h4>
                    <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.</p>
                    <a href="#" class="text-blue-600 hover:underline font-medium">Read More →</a>
                    </div>
                </div>
                </div>
            </div>
            </section>

    `,
        category: 'Sections',
    })

    editor.BlockManager.add('features-section', {
        label: 'Features Section',
        content: `
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4">Our Features</h2>
                <p class="text-lg text-gray-600">Discover what makes our product special</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition h-full text-center p-8">
                    <div class="text-5xl text-blue-600 mb-5">
                    <i class="fas fa-bolt"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Fast & Reliable</h3>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.</p>
                </div>

                <!-- Feature 2 -->
                <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition h-full text-center p-8">
                    <div class="text-5xl text-blue-600 mb-5">
                    <i class="fas fa-lock"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Secure</h3>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.</p>
                </div>

                <!-- Feature 3 -->
                <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition h-full text-center p-8">
                    <div class="text-5xl text-blue-600 mb-5">
                    <i class="fas fa-headset"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">24/7 Support</h3>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.</p>
                </div>
                </div>
            </div>
            </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('testimonial-section', {
        label: 'Testimonial Section',
        content: `
        <section class="py-16 bg-gray-100">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4">What Our Clients Say</h2>
                <p class="text-lg text-gray-600">Testimonials from our happy customers</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Testimonial 1 -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="text-yellow-400 text-xl mb-4">★★★★★</div>
                    <p class="italic text-gray-700">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."</p>
                    <div class="flex items-center mt-5">
                    <img src="https://via.placeholder.com/50" alt="Client" class="w-12 h-12 rounded-full">
                    <div class="ml-4">
                        <h5 class="font-semibold mb-1">John Doe</h5>
                        <p class="text-sm text-gray-500">CEO, Company Inc.</p>
                    </div>
                    </div>
                </div>

                <!-- Testimonial 2 -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="text-yellow-400 text-xl mb-4">★★★★★</div>
                    <p class="italic text-gray-700">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."</p>
                    <div class="flex items-center mt-5">
                    <img src="https://via.placeholder.com/50" alt="Client" class="w-12 h-12 rounded-full">
                    <div class="ml-4">
                        <h5 class="font-semibold mb-1">Jane Smith</h5>
                        <p class="text-sm text-gray-500">Marketing Director</p>
                    </div>
                    </div>
                </div>

                <!-- Testimonial 3 -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="text-yellow-400 text-xl mb-4">★★★★★</div>
                    <p class="italic text-gray-700">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."</p>
                    <div class="flex items-center mt-5">
                    <img src="https://via.placeholder.com/50" alt="Client" class="w-12 h-12 rounded-full">
                    <div class="ml-4">
                        <h5 class="font-semibold mb-1">Robert Johnson</h5>
                        <p class="text-sm text-gray-500">Freelancer</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('contact-section', {
        label: 'Contact Section',
        content: `
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid md:grid-cols-2 gap-10">
                <!-- Contact Info -->
                <div>
                    <h2 class="text-4xl font-bold mb-4">Get In Touch</h2>
                    <p class="text-lg text-gray-600 mb-8">We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.</p>

                    <div class="mb-6">
                    <h5 class="font-semibold text-lg flex items-center">
                        <i class="fas fa-map-marker-alt text-blue-600 mr-2"></i> Address
                    </h5>
                    <p class="text-gray-700">123 Street Name, City, Country</p>
                    </div>

                    <div class="mb-6">
                    <h5 class="font-semibold text-lg flex items-center">
                        <i class="fas fa-phone text-blue-600 mr-2"></i> Phone
                    </h5>
                    <p class="text-gray-700">+1 (123) 456-7890</p>
                    </div>

                    <div class="mb-6">
                    <h5 class="font-semibold text-lg flex items-center">
                        <i class="fas fa-envelope text-blue-600 mr-2"></i> Email
                    </h5>
                    <p class="text-gray-700">info@example.com</p>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <form>
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
                        <input type="text" id="name" placeholder="John Doe"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" placeholder="john@example.com"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    <div class="mb-4">
                        <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" rows="4" placeholder="Your message here..."
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">Send Message</button>
                    </form>
                </div>
                </div>
            </div>
        </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('header-section', {
        label: 'Header Section',
        content: `
        <header class="bg-white shadow-md py-5">
            <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <!-- Logo -->
                <a href="#" class="text-2xl font-bold text-blue-600">LOGO</a>

                <!-- Desktop Menu -->
                <nav class="hidden lg:flex space-x-6">
                <a href="#" class="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                <a href="#" class="text-gray-700 hover:text-blue-600 font-medium">About</a>
                <a href="#" class="text-gray-700 hover:text-blue-600 font-medium">Services</a>
                <a href="#" class="text-gray-700 hover:text-blue-600 font-medium">Portfolio</a>
                <a href="#" class="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
                </nav>

                <!-- Mobile menu toggle -->
                <div class="lg:hidden">
                <button id="mobile-menu-button" class="text-gray-700 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="lg:hidden hidden px-4 mt-4 space-y-2">
                <a href="#" class="block text-gray-700 hover:text-blue-600">Home</a>
                <a href="#" class="block text-gray-700 hover:text-blue-600">About</a>
                <a href="#" class="block text-gray-700 hover:text-blue-600">Services</a>
                <a href="#" class="block text-gray-700 hover:text-blue-600">Portfolio</a>
                <a href="#" class="block text-gray-700 hover:text-blue-600">Contact</a>
            </div>

            <!-- Toggle Script -->
            <script>
                document.getElementById('mobile-menu-button').addEventListener('click', () => {
                const menu = document.getElementById('mobile-menu');
                menu.classList.toggle('hidden');
                });
            </script>
        </header>
    `,
        category: 'Sections',
    });

    editor.BlockManager.add('menu-section', {
        label: 'Menu Navigation',
        content: `
        <nav class="bg-gray-900 text-white py-4">
            <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <a href="#" class="text-xl font-bold">Brand Name</a>
                
                <!-- Toggle button for mobile -->
                <button id="menu-toggle" class="lg:hidden focus:outline-none">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                </button>

                <!-- Navigation links -->
                <ul id="menu" class="hidden lg:flex space-x-6 items-center">
                <li><a href="#" class="hover:text-blue-400">Home</a></li>

                <!-- Dropdown -->
                <li class="relative group">
                    <button class="hover:text-blue-400 flex items-center">
                    Products
                    <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" 
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" 
                            clip-rule="evenodd"/>
                    </svg>
                    </button>
                    <ul class="absolute z-10 hidden group-hover:block bg-white text-black mt-2 py-2 w-40 rounded shadow-md">
                    <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Product 1</a></li>
                    <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Product 2</a></li>
                    <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Product 3</a></li>
                    </ul>
                </li>

                <li><a href="#" class="hover:text-blue-400">Services</a></li>
                <li><a href="#" class="hover:text-blue-400">About</a></li>
                <li><a href="#" class="hover:text-blue-400">Contact</a></li>
                </ul>
            </div>

            <!-- Mobile menu -->
            <ul id="mobile-menu" class="lg:hidden hidden px-4 mt-4 space-y-2 text-white">
                <li><a href="#" class="block hover:text-blue-400">Home</a></li>
                <li>
                <details class="group">
                    <summary class="cursor-pointer hover:text-blue-400">Products</summary>
                    <ul class="ml-4 mt-2 space-y-1">
                    <li><a href="#" class="block hover:text-blue-400">Product 1</a></li>
                    <li><a href="#" class="block hover:text-blue-400">Product 2</a></li>
                    <li><a href="#" class="block hover:text-blue-400">Product 3</a></li>
                    </ul>
                </details>
                </li>
                <li><a href="#" class="block hover:text-blue-400">Services</a></li>
                <li><a href="#" class="block hover:text-blue-400">About</a></li>
                <li><a href="#" class="block hover:text-blue-400">Contact</a></li>
            </ul>

            <script>
                const toggle = document.getElementById('menu-toggle');
                const menu = document.getElementById('menu');
                const mobileMenu = document.getElementById('mobile-menu');

                toggle.addEventListener('click', () => {
                menu.classList.toggle('hidden');
                mobileMenu.classList.toggle('hidden');
                });
            </script>
        </nav>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('footer-section', {
        label: 'Footer Section',
        content: `
        <footer class="bg-gray-900 text-white py-16">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                
                <!-- About Us -->
                <div>
                    <h4 class="text-white text-xl mb-4">About Us</h4>
                    <p class="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt arcu vel arcu fermentum, eget accumsan dolor dignissim.</p>
                    <div class="mt-3">
                    <a href="#" class="text-white text-2xl mr-4 hover:text-blue-400"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="text-white text-2xl mr-4 hover:text-blue-400"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-white text-2xl mr-4 hover:text-blue-400"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="text-white text-2xl mr-4 hover:text-blue-400"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
                
                <!-- Quick Links -->
                <div>
                    <h4 class="text-white text-xl mb-4">Quick Links</h4>
                    <ul class="text-gray-400">
                    <li class="mb-2"><a href="#" class="hover:text-blue-400">Home</a></li>
                    <li class="mb-2"><a href="#" class="hover:text-blue-400">About Us</a></li>
                    <li class="mb-2"><a href="#" class="hover:text-blue-400">Services</a></li>
                    <li class="mb-2"><a href="#" class="hover:text-blue-400">Portfolio</a></li>
                    <li class="mb-2"><a href="#" class="hover:text-blue-400">Contact</a></li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h4 class="text-white text-xl mb-4">Contact Info</h4>
                    <ul class="text-gray-400">
                    <li class="mb-2"><i class="fas fa-map-marker-alt mr-2"></i> 123 Street, City, Country</li>
                    <li class="mb-2"><i class="fas fa-phone mr-2"></i> +1 234 567 8900</li>
                    <li class="mb-2"><i class="fas fa-envelope mr-2"></i> info@example.com</li>
                    </ul>
                </div>

                </div>

                <!-- Bottom section -->
                <div class="mt-12 text-center">
                <hr class="border-gray-700">
                <p class="text-gray-400 mt-4">&copy; 2025 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `,
        category: 'Sections',
    });

    editor.BlockManager.add('about-section', {
        label: 'About Us Section',
        content: `
        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                <!-- Image -->
                <div>
                    <img src="https://via.placeholder.com/600x400" alt="About Us" class="w-full h-auto rounded-lg shadow-xl">
                </div>

                <!-- Text Section -->
                <div class="flex flex-col justify-center">
                    <h2 class="text-4xl font-bold mb-6">About Our Company</h2>
                    <p class="text-lg mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac.</p>
                    <p class="text-lg mb-8">Aenean ut magna lobortis nunc feugiat sagittis. Maecenas ut magna quis turpis mattis venenatis. Donec fermentum aliquet sapien, a cursus lectus pharetra ut.</p>
                    <button class="btn btn-primary py-3 px-6 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition">Learn More</button>
                </div>

                </div>
            </div>
        </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('pricing-section', {
        label: 'Pricing Section',
        content: `
        <section class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                <h2 class="text-4xl font-bold">Our Pricing Plans</h2>
                <p class="text-lg">Choose the perfect plan for your needs</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <!-- Basic Plan -->
                <div class="bg-white border border-gray-200 shadow-sm p-6 text-center rounded-lg">
                    <h3 class="text-xl font-semibold">Basic</h3>
                    <div class="text-4xl font-bold my-6">$19 <span class="text-base font-normal">/month</span></div>
                    <ul class="list-none mb-6">
                    <li class="mb-3">5 Projects</li>
                    <li class="mb-3">20GB Storage</li>
                    <li class="mb-3">Basic Support</li>
                    </ul>
                    <button class="btn btn-outline-primary py-3 px-6 w-full border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition">Get Started</button>
                </div>

                <!-- Professional Plan (Popular) -->
                <div class="bg-gray-100 border border-gray-200 shadow-lg transform scale-105 z-10 p-6 text-center rounded-lg">
                    <span class="bg-blue-500 text-white py-1 px-3 rounded-full text-sm mb-4 inline-block">Popular</span>
                    <h3 class="text-xl font-semibold">Professional</h3>
                    <div class="text-4xl font-bold my-6">$49 <span class="text-base font-normal">/month</span></div>
                    <ul class="list-none mb-6">
                    <li class="mb-3">10 Projects</li>
                    <li class="mb-3">50GB Storage</li>
                    <li class="mb-3">Priority Support</li>
                    </ul>
                    <button class="btn btn-primary py-3 px-6 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Get Started</button>
                </div>

                <!-- Enterprise Plan -->
                <div class="bg-white border border-gray-200 shadow-sm p-6 text-center rounded-lg">
                    <h3 class="text-xl font-semibold">Enterprise</h3>
                    <div class="text-4xl font-bold my-6">$99 <span class="text-base font-normal">/month</span></div>
                    <ul class="list-none mb-6">
                    <li class="mb-3">Unlimited Projects</li>
                    <li class="mb-3">100GB Storage</li>
                    <li class="mb-3">24/7 Support</li>
                    </ul>
                    <button class="btn btn-outline-primary py-3 px-6 w-full border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition">Get Started</button>
                </div>

                </div>
            </div>
        </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('team-section', {
        label: 'Team Section',
        content: `
        <section class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                <h2 class="text-4xl font-bold">Meet Our Team</h2>
                <p class="text-lg">The talented people behind our success</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Team Member 1 -->
                <div class="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <img src="https://via.placeholder.com/400x400" class="w-full rounded-t-lg" alt="Team Member">
                    <div class="p-6 text-center">
                    <h4 class="text-xl font-semibold">John Doe</h4>
                    <p class="text-sm text-gray-500">CEO & Founder</p>
                    <p class="text-base text-gray-700 my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.</p>
                    <div class="flex justify-center space-x-2">
                        <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-facebook"></i></a>
                    </div>
                    </div>
                </div>

                <!-- Team Member 2 -->
                <div class="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <img src="https://via.placeholder.com/400x400" class="w-full rounded-t-lg" alt="Team Member">
                    <div class="p-6 text-center">
                    <h4 class="text-xl font-semibold">Jane Smith</h4>
                    <p class="text-sm text-gray-500">Creative Director</p>
                    <p class="text-base text-gray-700 my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.</p>
                    <div class="flex justify-center space-x-2">
                        <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-facebook"></i></a>
                    </div>
                    </div>
                </div>

                <!-- Team Member 3 -->
                <div class="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <img src="https://via.placeholder.com/400x400" class="w-full rounded-t-lg" alt="Team Member">
                    <div class="p-6 text-center">
                    <h4 class="text-xl font-semibold">Mike Johnson</h4>
                    <p class="text-sm text-gray-500">Lead Developer</p>
                    <p class="text-base text-gray-700 my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.</p>
                    <div class="flex justify-center space-x-2">
                        <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-facebook"></i></a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('cta-section', {
        label: 'Call to Action Section',
        content: `
        <section class="py-20 bg-blue-600 text-white">
            <div class="container mx-auto px-4">
                <div class="flex items-center">
                <div class="lg:w-2/3 mb-6 lg:mb-0">
                    <h2 class="text-4xl font-bold">Ready to Get Started?</h2>
                    <p class="text-xl opacity-90">Join thousands of satisfied customers using our product</p>
                </div>
                <div class="lg:w-1/3 text-lg-end">
                    <button class="btn btn-light btn-lg px-4 me-2 bg-white text-blue-600 hover:bg-gray-200">Sign Up Free</button>
                    <button class="btn btn-outline-light btn-lg px-4 border-2 border-white hover:bg-white hover:text-blue-600">Learn More</button>
                </div>
                </div>
            </div>
        </section>

    `,
        category: 'Sections',
    });

    editor.BlockManager.add('stats-section', {
        label: 'Statistics Section',
        content: `
        <section class="py-20 bg-gray-100">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                <h2 class="text-4xl font-bold">Our Impact</h2>
                <p class="text-xl text-gray-600">Some numbers that we are proud of</p>
                </div>
                <div class="flex flex-wrap justify-center">
                <div class="lg:w-1/4 w-full mb-6">
                    <div class="p-6 bg-white rounded-lg shadow-md text-center">
                    <h3 class="text-4xl font-bold text-blue-600">500+</h3>
                    <p class="text-lg text-gray-600">Projects Completed</p>
                    </div>
                </div>
                <div class="lg:w-1/4 w-full mb-6">
                    <div class="p-6 bg-white rounded-lg shadow-md text-center">
                    <h3 class="text-4xl font-bold text-blue-600">100+</h3>
                    <p class="text-lg text-gray-600">Team Members</p>
                    </div>
                </div>
                <div class="lg:w-1/4 w-full mb-6">
                    <div class="p-6 bg-white rounded-lg shadow-md text-center">
                    <h3 class="text-4xl font-bold text-blue-600">50+</h3>
                    <p class="text-lg text-gray-600">Countries Served</p>
                    </div>
                </div>
                <div class="lg:w-1/4 w-full mb-6">
                    <div class="p-6 bg-white rounded-lg shadow-md text-center">
                    <h3 class="text-4xl font-bold text-blue-600">15+</h3>
                    <p class="text-lg text-gray-600">Years of Experience</p>
                    </div>
                </div>
                </div>
            </div>
        </section>

    `,
        category: 'Sections',
    });



    editor.BlockManager.add('container', {
        label: 'Container',
        content: '<div class="container mx-auto p-5 border border-gray-300">Container</div>',
        category: 'Layout',
    });

    editor.BlockManager.add('row', {
        label: 'Row',
        content: '<div class="flex flex-wrap border border-dashed border-gray-300 p-2">Row</div>',
        category: 'Layout',
    });

    editor.BlockManager.add('column', {
        label: 'Column',
        content:
            '<div class="col border border-gray-300 p-4">Column</div>',
        category: 'Layout',
    });

    editor.BlockManager.add('two-columns', {
        label: 'Two Columns',
        content: `
        <div class="flex flex-wrap border border-dashed border-gray-300 p-4">
            <div class="w-full md:w-1/2 border border-gray-300 p-4">
                <p>Column 1</p>
            </div>
            <div class="w-full md:w-1/2 border border-gray-300 p-4">
                <p>Column 2</p>
            </div>
        </div>
    `,
        category: 'Layout',
    });

    editor.BlockManager.add('three-columns', {
        label: 'Three Columns',
        content: `
        <div class="flex flex-wrap border border-dashed border-gray-300 p-4">
            <div class="w-full md:w-1/3 border border-gray-300 p-4">
                <p>Column 1</p>
            </div>
            <div class="w-full md:w-1/3 border border-gray-300 p-4">
                <p>Column 2</p>
            </div>
            <div class="w-full md:w-1/3 border border-gray-300 p-4">
                <p>Column 3</p>
            </div>
        </div>
    `,
        category: 'Layout',
    });

    editor.BlockManager.add('four-columns', {
        label: 'Four Columns',
        content: `
        <div class="flex flex-wrap border border-dashed border-gray-300 p-4">
            <div class="w-full md:w-1/4 border border-gray-300 p-4">
                <p>Column 1</p>
            </div>
            <div class="w-full md:w-1/4 border border-gray-300 p-4">
                <p>Column 2</p>
            </div>
            <div class="w-full md:w-1/4 border border-gray-300 p-4">
                <p>Column 3</p>
            </div>
            <div class="w-full md:w-1/4 border border-gray-300 p-4">
                <p>Column 4</p>
            </div>
        </div>
    `,
        category: 'Layout',
    });

    editor.BlockManager.add('sidebar-layout', {
        label: 'Sidebar Layout',
        content: `
        <div class="flex flex-wrap border border-dashed border-gray-300 p-4">
            <div class="w-full md:w-2/3 border border-gray-300 p-4">
                <p>Main Content Area</p>
            </div>
            <div class="w-full md:w-1/3 border border-gray-300 p-4 bg-gray-100">
                <p>Sidebar</p>
            </div>
        </div>
    `,
        category: 'Layout',
    });

    editor.BlockManager.add('grid-layout', {
        label: 'Grid Layout',
        content: `
        <div class="grid grid-cols-3 gap-4 border border-dashed border-gray-300 p-4">
            <div class="border border-gray-300 p-4 min-h-[100px]">Grid Item 1</div>
            <div class="border border-gray-300 p-4 min-h-[100px]">Grid Item 2</div>
            <div class="border border-gray-300 p-4 min-h-[100px]">Grid Item 3</div>
            <div class="border border-gray-300 p-4 min-h-[100px]">Grid Item 4</div>
            <div class="border border-gray-300 p-4 min-h-[100px]">Grid Item 5</div>
            <div class="border border-gray-300 p-4 min-h-[100px]">Grid Item 6</div>
        </div>
    `,
        category: 'Layout',
    });

    editor.BlockManager.add('flex-container', {
        label: 'Flex Container',
        content: `
        <div class="flex flex-wrap gap-4 border border-dashed border-gray-300 p-4">
            <div class="flex-1 min-w-[200px] border border-gray-300 p-4">Flex Item 1</div>
            <div class="flex-1 min-w-[200px] border border-gray-300 p-4">Flex Item 2</div>
            <div class="flex-1 min-w-[200px] border border-gray-300 p-4">Flex Item 3</div>
        </div>
    `,
        category: 'Layout',
    });





    //Basic Category
    editor.BlockManager.add('text', {
        label: 'Text',
        content: '<p class="text-base">Insert your text here</p>',
        category: 'Basic',
    });

    editor.BlockManager.add('heading', {
        label: 'Heading',
        content:
            '<h1 class="text-2xl font-bold">This is a Heading</h1>',
        category: 'Basic',
    });

    editor.BlockManager.add('button', {
        label: 'Button',
        content:
            '<button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Click Me</button>',
        category: 'Basic',
    });





    editor.BlockManager.add('form', {
        label: 'Basic Form',
        content: `
        <form class="p-6 border border-gray-300 rounded-lg bg-gray-50">
            <h3 class="text-xl font-semibold mb-4">Contact Form</h3>
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
                <input type="text" id="name" name="name" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                <input type="email" id="email" name="email" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div class="mb-4">
                <label for="message" class="block text-sm font-medium text-gray-700">Message:</label>
                <textarea id="message" name="message" rows="4" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <button type="submit" class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">Submit</button>
        </form>
    `,
        category: 'Forms',
    });

    editor.BlockManager.add('survey-form', {
        label: 'Survey Form',
        content: `
        <form class="p-6 border border-gray-300 rounded-lg bg-gray-50">
            <h3 class="text-xl font-semibold mb-4">Customer Survey</h3>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate our service?</label>
                <div class="flex flex-col space-y-2">
                    <label class="flex items-center">
                        <input type="radio" name="rating" value="5" class="form-radio text-blue-600">
                        <span class="ml-2">Excellent</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="rating" value="4" class="form-radio text-blue-600">
                        <span class="ml-2">Good</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="rating" value="3" class="form-radio text-blue-600">
                        <span class="ml-2">Average</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="rating" value="2" class="form-radio text-blue-600">
                        <span class="ml-2">Below Average</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="rating" value="1" class="form-radio text-blue-600">
                        <span class="ml-2">Poor</span>
                    </label>
                </div>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">What aspects of our service did you like? (Select all that apply)</label>
                <div class="flex flex-col space-y-2">
                    <label class="flex items-center">
                        <input type="checkbox" name="aspects" value="quality" class="form-checkbox text-blue-600">
                        <span class="ml-2">Quality</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" name="aspects" value="speed" class="form-checkbox text-blue-600">
                        <span class="ml-2">Speed</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" name="aspects" value="price" class="form-checkbox text-blue-600">
                        <span class="ml-2">Price</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" name="aspects" value="support" class="form-checkbox text-blue-600">
                        <span class="ml-2">Customer Support</span>
                    </label>
                </div>
            </div>
            <div class="mb-4">
                <label for="feedback" class="block text-sm font-medium text-gray-700 mb-2">Additional Feedback:</label>
                <textarea id="feedback" name="feedback" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Submit Survey</button>
        </form>
    `,
        category: 'Forms',
    });

    editor.BlockManager.add('registration-form', {
        label: 'Registration Form',
        content: `
        <form class="p-6 border border-gray-300 rounded-lg bg-gray-50">
            <h3 class="text-xl font-semibold mb-4">Create Account</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700">First Name:</label>
                    <input type="text" id="firstName" name="firstName" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
            </div>
            <div class="mt-4">
                <label for="regEmail" class="block text-sm font-medium text-gray-700">Email Address:</label>
                <input type="email" id="regEmail" name="email" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div class="mt-4">
                <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
                <input type="password" id="password" name="password" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div class="mt-4">
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div class="mt-4">
                <label for="dob" class="block text-sm font-medium text-gray-700">Date of Birth:</label>
                <input type="date" id="dob" name="dob" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div class="mt-4 flex items-center">
                <input type="checkbox" id="terms" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" required />
                <label for="terms" class="ml-2 block text-sm text-gray-700">I agree to the Terms and Conditions</label>
            </div>
            <button type="submit" class="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Register</button>
        </form>
    `,
        category: 'Forms',
    });

    editor.BlockManager.add('conditional-form', {
        label: 'Conditional Form',
        content: `
        <form class="p-6 border border-gray-300 rounded-lg bg-gray-50">
            <h3 class="text-xl font-semibold mb-4">Event Registration</h3>
            <div class="mb-4">
                <label for="eventType" class="block text-sm font-medium text-gray-700">Type of Event:</label>
                <select id="eventType" name="eventType" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onchange="toggleEventFields(this.value)">
                    <option value="">Select Event Type</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="webinar">Webinar</option>
                </select>
            </div>
            
            <!-- Conditional fields that will be shown/hidden based on selection -->
            <div id="conferenceFields" class="hidden">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Which days will you attend?</label>
                    <div class="flex flex-col space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" name="days" id="day1" value="day1" class="form-checkbox text-blue-600">
                            <span class="ml-2">Day 1 - Keynote Sessions</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" name="days" id="day2" value="day2" class="form-checkbox text-blue-600">
                            <span class="ml-2">Day 2 - Workshops</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" name="days" id="day3" value="day3" class="form-checkbox text-blue-600">
                            <span class="ml-2">Day 3 - Networking</span>
                        </label>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="dietaryRestrictions" class="block text-sm font-medium text-gray-700">Dietary Restrictions:</label>
                    <input type="text" id="dietaryRestrictions" name="dietaryRestrictions" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
            </div>
            
            <div id="workshopFields" class="hidden">
                <div class="mb-4">
                    <label for="workshopTopic" class="block text-sm font-medium text-gray-700">Select Workshop Topic:</label>
                    <select id="workshopTopic" name="workshopTopic" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option value="design">UX Design</option>
                        <option value="development">Web Development</option>
                        <option value="marketing">Digital Marketing</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="experienceLevel" class="block text-sm font-medium text-gray-700">Experience Level:</label>
                    <select id="experienceLevel" name="experienceLevel" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>
            
            <div id="webinarFields" class="hidden">
                <div class="mb-4">
                    <label for="deviceType" class="block text-sm font-medium text-gray-700">Device you'll use to join:</label>
                    <select id="deviceType" name="deviceType" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option value="desktop">Desktop/Laptop</option>
                        <option value="tablet">Tablet</option>
                        <option value="mobile">Mobile Phone</option>
                    </select>
                </div>
                <div class="mb-4 flex items-center">
                    <input type="checkbox" id="recordingConsent" name="recordingConsent" class="form-checkbox text-blue-600">
                    <label for="recordingConsent" class="ml-2 text-sm text-gray-700">I consent to being recorded during the webinar</label>
                </div>
            </div>
            
            <div class="mb-4">
                <label for="comments" class="block text-sm font-medium text-gray-700">Additional Comments:</label>
                <textarea id="comments" name="comments" rows="3" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            
            <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Register for Event</button>
        </form>
        
        <script>
            function toggleEventFields(eventType) {
                document.getElementById('conferenceFields').classList.add('hidden');
                document.getElementById('workshopFields').classList.add('hidden');
                document.getElementById('webinarFields').classList.add('hidden');
                
                if (eventType === 'conference') {
                    document.getElementById('conferenceFields').classList.remove('hidden');
                } else if (eventType === 'workshop') {
                    document.getElementById('workshopFields').classList.remove('hidden');
                } else if (eventType === 'webinar') {
                    document.getElementById('webinarFields').classList.remove('hidden');
                }
            }
        </script>
    `,
        category: 'Forms',
    });





    //Media Category

    editor.BlockManager.add('video', {
        label: 'Video',
        content:
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
        category: 'Media',
    });

    editor.BlockManager.add('carousel', {
        label: 'Carousel',
        content: `
        <div class="relative w-full">
            <div class="carousel">
                <div class="carousel-item relative w-full">
                    <img src="https://via.placeholder.com/800x400?text=First+Slide" class="w-full" alt="First Slide">
                </div>
                <div class="carousel-item relative w-full">
                    <img src="https://via.placeholder.com/800x400?text=Second+Slide" class="w-full" alt="Second Slide">
                </div>
                <div class="carousel-item relative w-full">
                    <img src="https://via.placeholder.com/800x400?text=Third+Slide" class="w-full" alt="Third Slide">
                </div>
            </div>
            <button class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700" data-carousel-prev>
                <span class="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700" data-carousel-next>
                <span class="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
        <style>
            .carousel {
                display: flex;
                overflow: hidden;
                scroll-snap-type: x mandatory;
            }
            .carousel-item {
                flex: none;
                scroll-snap-align: start;
            }
        </style>
        `,
        category: 'Media',
    });

    editor.BlockManager.add('image', {
        label: 'Image',
        content:
            '<img src="https://via.placeholder.com/150" alt="Placeholder Image" style="width: 100%; height: auto;" />',
        category: 'Media',
    });

    editor.BlockManager.add('auto-scroll-carousel', {
        label: 'Auto-Scroll Carousel',
        content: `
        <div class="overflow-hidden relative w-full my-5">
            <div class="flex animate-carousel-scroll">
                <img src="https://via.placeholder.com/300x200" class="w
                <img src="https://via.placeholder.com/300x200" style="min-width: 300px; height: 200px; margin-right: 15px;" alt="Carousel Image">
                <img src="https://via.placeholder.com/300x200" style="min-width: 300px; height: 200px; margin-right: 15px;" alt="Carousel Image">
                <img src="https://via.placeholder.com/300x200" style="min-width: 300px; height: 200px; margin-right: 15px;" alt="Carousel Image">
                <img src="https://via.placeholder.com/300x200" style="min-width: 300px; height: 200px; margin-right: 15px;" alt="Carousel Image">
                <!-- Duplicate images for seamless scrolling -->
                <img src="https://via.placeholder.com/300x200" style="min-width: 300px; height: 200px; margin-right: 15px;" alt="Carousel Image">
                <img src="https://via.placeholder.com/300x200" style="min-width: 300px; height: 200px; margin-right: 15px;" alt="Carousel Image">
                <img src="https://via.placeholder.com/300x200" style="min-width: 300px; height: 200px; margin-right: 15px;" alt="Carousel Image">
            </div>
            <style>
                @keyframes carousel-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-300px * 5 - 15px * 5)); }
                }
            </style>
        </div>
    `,
        category: 'Media',
    });

    editor.BlockManager.add('image-gallery', {
        label: 'Image Gallery',
        content: `
        <div class="grid grid-cols-3 gap-4 my-5">
            <img src="https://via.placeholder.com/300x200" alt="Gallery Image" class="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="https://via.placeholder.com/300x200" alt="Gallery Image" class="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="https://via.placeholder.com/300x200" alt="Gallery Image" class="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="https://via.placeholder.com/300x200" alt="Gallery Image" class="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="https://via.placeholder.com/300x200" alt="Gallery Image" class="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="https://via.placeholder.com/300x200" alt="Gallery Image" class="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        </div>
    `,
        category: 'Media',
    });

    editor.BlockManager.add('video-background', {
        label: 'Video Background',
        content: `
        <div class="relative h-[500px] overflow-hidden my-5">
            <video autoplay muted loop class="absolute min-w-full min-h-full w-auto h-auto z-[-1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-5 bg-black/40">
                <h2 class="text-3xl md:text-5xl mb-5">Your Heading Here</h2>
                <p class="text-lg md:text-xl max-w-2xl mb-8">Your descriptive text goes here. Add details about your product, service, or content.</p>
                <button class="bg-white text-black py-3 px-6 rounded-lg text-lg hover:bg-gray-200 transition">Call to Action</button>
            </div>
        </div>
    `,
        category: 'Media',
    });

    editor.BlockManager.add('audio-player', {
        label: 'Audio Player',
        content: `
        <div class="audio-container my-5 p-5 bg-gray-100 rounded-lg">
            <h4 class="mb-4 text-lg font-semibold">Audio Title</h4>
            <audio controls class="w-full">
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <p class="mt-3 text-sm text-gray-600">Audio description or transcript can go here.</p>
        </div>
    `,
        category: 'Media',
    });

    editor.BlockManager.add('responsive-iframe', {
        label: 'Responsive iFrame',
        content: `
        <div class="relative overflow-hidden pt-[56.25%] my-5">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059445135!2d-74.25986613799748!3d40.69714941774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1645189421172!5m2!1sen!2sin" 
                class="absolute top-0 left-0 w-full h-full border-0" 
                allowfullscreen="" loading="lazy">
            </iframe>
        </div>
    `,
        category: 'Media',
    });

    editor.BlockManager.add('before-after', {
        label: 'Before-After Slider',
        content: `
        <div class="relative w-full h-96 my-5 overflow-hidden">
            <img src="https://via.placeholder.com/800x400/FF5733/FFFFFF?text=AFTER" class="absolute top-0 left-0 w-full h-full object-cover">
            <div class="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                <img src="https://via.placeholder.com/800x400/33A8FF/FFFFFF?text=BEFORE" class="w-full h-full object-cover">
            </div>
            <div class="absolute top-0 left-1/2 w-1 h-full bg-white cursor-ew-resize z-10">
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex justify-center items-center shadow-md">
                    <i class="fas fa-arrows-alt-h text-gray-700"></i>
                </div>
            </div>
        </div>
        <script>
            // This would need proper implementation with JavaScript for the slider functionality
            console.log('Before-After slider needs JavaScript implementation');
        </script>
    `,
        category: 'Media',
    });

    editor.BlockManager.add('masonry-gallery', {
        label: 'Masonry Gallery',
        content: `
        <div class="masonry-gallery my-5" style="column-count: 3; column-gap: 1rem;">
            <div class="mb-4" style="break-inside: avoid;">
                <img src="https://via.placeholder.com/800x600" class="w-full rounded-lg shadow-md">
            </div>
            <div class="mb-4" style="break-inside: avoid;">
                <img src="https://via.placeholder.com/800x1200" class="w-full rounded-lg shadow-md">
            </div>
            <div class="mb-4" style="break-inside: avoid;">
                <img src="https://via.placeholder.com/800x800" class="w-full rounded-lg shadow-md">
            </div>
            <div class="mb-4" style="break-inside: avoid;">
                <img src="https://via.placeholder.com/800x500" class="w-full rounded-lg shadow-md">
            </div>
            <div class="mb-4" style="break-inside: avoid;">
                <img src="https://via.placeholder.com/800x900" class="w-full rounded-lg shadow-md">
            </div>
            <div class="mb-4" style="break-inside: avoid;">
                <img src="https://via.placeholder.com/800x700" class="w-full rounded-lg shadow-md">
            </div>
        </div>
    `,
        category: 'Media',
    });

    editor.BlockManager.add('video-playlist', {
        label: 'Video Playlist',
        content: `
        <div class="flex flex-wrap gap-5 my-5">
            <div class="flex-1 min-w-[300px]">
                <div class="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                    <iframe class="absolute top-0 left-0 w-full h-full border-0" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="Video Player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <h4 class="mt-4 text-lg font-semibold">Video Title</h4>
                <p class="text-gray-600">Video description goes here. Provide context about what viewers will learn or experience.</p>
            </div>
            <div class="flex-1 min-w-[200px]">
                <h5 class="mb-4 text-lg font-semibold">Playlist</h5>
                <div class="flex flex-col gap-3">
                    <div class="flex gap-3 bg-gray-100 p-3 rounded-lg cursor-pointer">
                        <img src="https://via.placeholder.com/120x68" class="w-[120px] h-[68px] object-cover rounded-md">
                        <div>
                            <p class="font-semibold">Video 1</p>
                            <small class="text-gray-500">3:45</small>
                        </div>
                    </div>
                    <div class="flex gap-3 bg-gray-100 p-3 rounded-lg cursor-pointer">
                        <img src="https://via.placeholder.com/120x68" class="w-[120px] h-[68px] object-cover rounded-md">
                        <div>
                            <p class="font-semibold">Video 2</p>
                            <small class="text-gray-500">2:30</small>
                        </div>
                    </div>
                    <div class="flex gap-3 bg-gray-100 p-3 rounded-lg cursor-pointer">
                        <img src="https://via.placeholder.com/120x68" class="w-[120px] h-[68px] object-cover rounded-md">
                        <div>
                            <p class="font-semibold">Video 3</p>
                            <small class="text-gray-500">4:15</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
        category: 'Media',
    });





    //Component Category

    editor.BlockManager.add('card', {
        label: 'Card',
        content: `
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src="https://via.placeholder.com/150" alt="Card Image">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Card Title</div>
                <p class="text-gray-700 text-base">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <a href="#" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go somewhere
                </a>
            </div>
        </div>
        `,
        category: 'Components',
    });

    editor.BlockManager.add('profile-card', {
        label: 'Profile Card',
        content: `
        <div class="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-6 text-center">
                <img src="https://via.placeholder.com/150" alt="Profile Image" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover">
                <h4 class="text-xl font-semibold">John Doe</h4>
                <p class="text-gray-500">Product Designer</p>
                <p class="text-gray-600 mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div class="flex justify-center mt-4 space-x-3">
                    <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-github"></i></a>
                </div>
            </div>
        </div>
    `,
        category: 'Components',
    });

    editor.BlockManager.add('pricing-table', {
        label: 'Pricing Table',
        content: `
        <div class="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-
            <div class="card-header bg-primary text-white text-center py-3">
                <h4 class="mb-0">Premium Plan</h4>
            </div>
            <div class="card-body text-center p-4">
                <h2 class="card-title pricing-card-title">$49<small class="text-muted fw-light">/mo</small></h2>
                <ul class="list-unstyled mt-3 mb-4">
                    <li>10 users included</li>
                    <li>2 GB of storage</li>
                    <li>Email support</li>
                    <li>Help center access</li>
                </ul>
                <button type="button" class="btn btn-primary btn-lg w-100">Get started</button>
            </div>
        </div>
    `,
        category: 'Components',
    });

    editor.BlockManager.add('progress-bar', {
        label: 'Progress Bar',
        content: `
        <div class="my-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Web Design</label>
            <div class="w-full bg-gray-200 rounded-full h-4">
                <div class="bg-green-500 h-4 rounded-full text-center text-white text-xs leading-4" style="width: 85%;">85%</div>
            </div>
        </div>
    `,
        category: 'Components',
    });

    editor.BlockManager.add('timeline', {
        label: 'Timeline',
        content: `
        <div class="timeline max-w-md mx-auto my-8">
            <div class="timeline-item relative pl-10 mb-8">
                <div class="timeline-dot absolute left-0 top-0 w-5 h-5 rounded-full bg-blue-500"></div>
                <div class="timeline-date font-bold mb-2">2023</div>
                <div class="timeline-content p-4 bg-gray-100 rounded-lg shadow">
                    <h5 class="font-semibold">Company Founded</h5>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div class="timeline-item relative pl-10 mb-8">
                <div class="timeline-dot absolute left-0 top-0 w-5 h-5 rounded-full bg-blue-500"></div>
                <div class="timeline-date font-bold mb-2">2024</div>
                <div class="timeline-content p-4 bg-gray-100 rounded-lg shadow">
                    <h5 class="font-semibold">Major Milestone</h5>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    `,
        category: 'Components',
    });

    editor.BlockManager.add('testimonial-slider', {
        label: 'Testimonial Slider',
        content: `
        <div id="testimonialCarousel" class="relative max-w-3xl mx-auto overflow-hidden">
            <div class="carousel-inner flex transition-transform duration-500 ease-in-out">
                <div class="carousel-item w-full flex-shrink-0 active">
                    <div class="bg-white shadow-md rounded-lg p-6 text-center">
                        <img src="https://via.placeholder.com/80" class="w-20 h-20 rounded-full mx-auto mb-4" alt="Testimonial">
                        <p class="text-lg italic">"This product has completely transformed our business operations."</p>
                        <h5 class="mt-4 font-semibold">John Smith</h5>
                        <p class="text-sm text-gray-500">CEO, Company Inc.</p>
                    </div>
                </div>
                <div class="carousel-item w-full flex-shrink-0">
                    <div class="bg-white shadow-md rounded-lg p-6 text-center">
                        <img src="https://via.placeholder.com/80" class="w-20 h-20 rounded-full mx-auto mb-4" alt="Testimonial">
                        <p class="text-lg italic">"The customer support team is incredibly responsive and helpful."</p>
                        <h5 class="mt-4 font-semibold">Jane Doe</h5>
                        <p class="text-sm text-gray-500">Marketing Director</p>
                    </div>
                </div>
            </div>
            <button class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700" data-carousel-prev>
                <span class="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700" data-carousel-next>
                <span class="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
        <style>
            .carousel-inner {
                display: flex;
                transform: translateX(0%);
            }
            .carousel-item {
                flex: 0 0 100%;
            }
        </style>
        <script>
            const prevButton = document.querySelector('[data-carousel-prev]');
            const nextButton = document.querySelector('[data-carousel-next]');
            const carouselInner = document.querySelector('.carousel-inner');
            let currentIndex = 0;

            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselInner.children.length - 1;
                carouselInner.style.transform = \`translateX(-\${currentIndex * 100}%)\`;
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < carouselInner.children.length - 1) ? currentIndex + 1 : 0;
                carouselInner.style.transform = \`translateX(-\${currentIndex * 100}%)\`;
            });
        </script>
    `,
        category: 'Components',
    });

    editor.BlockManager.add('social-icons', {
        label: 'Social Icons',
        content: `
        <div class="flex gap-4 justify-center my-4">
            <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white">
                <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500 text-white">
                <i class="fab fa-instagram"></i>
            </a>
        </div>
    `,
        category: 'Components',
    });






    //Animation category 
    editor.BlockManager.add('animated-text', {
        label: 'Animated Text',
        content: '<h2 class="animate__animated animate__bounce">Animated Heading</h2>',
        category: 'Animations',
    });

    editor.BlockManager.add('fade-in', {
        label: 'Fade In',
        content: '<div class="animate__animated animate__fadeIn">This content fades in</div>',
        category: 'Animations',
    });

    editor.BlockManager.add('slide-in', {
        label: 'Slide In',
        content: '<div class="animate__animated animate__slideInLeft">This content slides in from the left</div>',
        category: 'Animations',
    });

    editor.BlockManager.add('bounce-in', {
        label: 'Bounce In',
        content: '<div class="animate__animated animate__bounceIn">This content bounces in</div>',
        category: 'Animations',
    });

    editor.BlockManager.add('flip', {
        label: 'Flip Animation',
        content: '<div class="animate__animated animate__flip">This content flips</div>',
        category: 'Animations',
    });

    editor.BlockManager.add('pulse', {
        label: 'Pulse Effect',
        content: '<div class="animate__animated animate__pulse animate__infinite">This content pulses continuously</div>',
        category: 'Animations',
    });

    editor.BlockManager.add('zoom-in', {
        label: 'Zoom In',
        content: '<div class="animate__animated animate__zoomIn">This content zooms in</div>',
        category: 'Animations',
    });

    editor.BlockManager.add('shake', {
        label: 'Shake Effect',
        content: '<div class="animate__animated animate__shakeX">This content shakes horizontally</div>',
        category: 'Animations',
    });

    editor.BlockManager.add('aos-fade-up', {
        label: 'AOS Fade Up',
        content: `
      <div data-aos="fade-up" class="p-6 bg-gray-100 my-5">
        <h3 class="text-lg font-semibold">This content will animate when scrolled into view</h3>
        <p class="text-gray-600">Scroll down to see the animation effect</p>
      </div>
    `,
        category: 'Animations',
    });

    editor.BlockManager.add('aos-fade-down', {
        label: 'AOS Fade Down',
        content: `
      <div data-aos="fade-down" data-aos-duration="1000" class="p-8 bg-gray-100 my-5">
        <h3 class="text-lg font-semibold">This content fades down</h3>
        <p class="text-gray-600">With a 1 second duration</p>
      </div>
    `,
        category: 'Animations',
    });

    editor.BlockManager.add('animated-section', {
        label: 'Animated Section',
        content: `
        <section class="animate__animated animate__fadeIn py-12 bg-gray-100">
            <div class="container mx-auto px-4">
                <div class="text-center">
                    <h2 class="animate__animated animate__slideInDown text-4xl font-bold mb-4" style="animation-delay: 0.5s;">Animated Section</h2>
                    <p class="animate__animated animate__fadeIn text-lg text-gray-600 mb-6" style="animation-delay: 1s;">This entire section has animations applied to different elements</p>
                    <button class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition animate__animated animate__bounceIn" style="animation-delay: 1.5s;">Click Me</button>
                </div>
            </div>
        </section>
    `,
        category: 'Animations',
    });

    editor.BlockManager.add('typing-text', {
        label: 'Typing Text',
        content: `
        <div class="py-5 text-center">
            <h3 class="text-lg font-semibold">I am a <span id="typed-text" class="text-blue-600"></span></h3>
            <script>
                setTimeout(() => {
                    new Typed('#typed-text', {
                        strings: ['Designer', 'Developer', 'Marketer', 'Photographer'],
                        typeSpeed: 50,
                        backSpeed: 30,
                        loop: true
                    });
                }, 1000);
            </script>
        </div>
    `,
        category: 'Animations',
    });

    editor.BlockManager.add('scroll-reveal', {
        label: 'Scroll Reveal',
        content: `
        <div data-aos="fade-up" data-aos-duration="1000" class="p-6 bg-gray-100 my-5">
            <h3 class="text-lg font-semibold">This content will animate when scrolled into view</h3>
            <p class="text-gray-600">Add the AOS library to your page to enable this effect</p>
            <script>
                // Note: This requires AOS library to be included in your project
                document.addEventListener('DOMContentLoaded', function() {
                    AOS.init();
                });
            </script>
        </div>
    `,
        category: 'Animations',
    });



    editor.BlockManager.add('modal', {
        label: 'Modal',
        content: `
        <!-- Button to trigger modal -->
        <button id="openModalBtn"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Launch demo modal
        </button>

        <!-- Modal Overlay -->
        <div id="exampleModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div class="flex items-center justify-between px-4 py-3 border-b">
            <h5 class="text-lg font-semibold">Modal title</h5>
            <button id="closeModalBtn" class="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
            </div>
            <div class="p-4">
            Modal content goes here
            </div>
            <div class="flex justify-end gap-2 px-4 py-3 border-t">
            <button id="closeModalBtn2"
                    class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
                Close
            </button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Save changes
            </button>
            </div>
        </div>
        </div>

        <script>
        const openModalBtn = document.getElementById('openModalBtn');
        const modal = document.getElementById('exampleModal');
        const closeBtns = [document.getElementById('closeModalBtn'), document.getElementById('closeModalBtn2')];

        // Open modal when button is clicked
        openModalBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        // Close modal when close button is clicked
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
            modal.classList.add('hidden');
            });
        });

        // Optional: close modal when clicking outside of the modal
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
            modal.classList.add('hidden');
            }
        });
        </script>

    `,
        category: 'Interactive',
    });


    editor.BlockManager.add('accordion', {
        label: 'Accordion',
        content: `
        <div class="w-full max-w-xl mx-auto my-6" id="accordion">
        <!-- Item 1 -->
        <div class="border border-gray-300 rounded mb-2">
            <button class="accordion-header w-full text-left px-4 py-3 bg-gray-100 font-semibold"
                    data-target="item1">
            Accordion Item #1
            </button>
            <div id="item1" class="accordion-body px-4 py-3 border-t transition-all duration-300">
            This is the first item's accordion body. Click the header to expand/collapse.
            </div>
        </div>

        <!-- Item 2 -->
        <div class="border border-gray-300 rounded mb-2">
            <button class="accordion-header w-full text-left px-4 py-3 bg-gray-100 font-semibold"
                    data-target="item2">
            Accordion Item #2
            </button>
            <div id="item2" class="accordion-body hidden px-4 py-3 border-t transition-all duration-300">
            This is the second item's accordion body. It's hidden by default.
            </div>
        </div>
        </div>

        <script>
        const headers = document.querySelectorAll('.accordion-header');
        const bodies = document.querySelectorAll('.accordion-body');

        headers.forEach(header => {
            header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-target');
            bodies.forEach(body => {
                if (body.id === targetId) {
                body.classList.toggle('hidden');
                } else {
                body.classList.add('hidden');
                }
            });
            });
        });
        </script>

    `,
        category: 'Interactive',
    });

    editor.BlockManager.add('tabs', {
        label: 'Tabs',
        content: `
        <div class="w-full max-w-xl mx-auto my-6">
        <!-- Tab Headers -->
        <div class="flex border-b border-gray-300" id="tabs">
            <button class="tab-button px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-semibold"
                    data-target="home">
            Home
            </button>
            <button class="tab-button px-4 py-2 text-gray-600 hover:text-blue-600"
                    data-target="profile">
            Profile
            </button>
            <button class="tab-button px-4 py-2 text-gray-600 hover:text-blue-600"
                    data-target="contact">
            Contact
            </button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content p-4 border border-t-0 border-gray-300">
            <div id="home" class="tab-pane block">
            This is the home tab content.
            </div>
            <div id="profile" class="tab-pane hidden">
            This is the profile tab content.
            </div>
            <div id="contact" class="tab-pane hidden">
            This is the contact tab content.
            </div>
        </div>
        </div>

        <script>
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
            // Remove active classes
            tabButtons.forEach(btn => {
                btn.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
                btn.classList.add('text-gray-600');
            });

            tabPanes.forEach(pane => pane.classList.add('hidden'));
            
            // Activate clicked tab
            button.classList.remove('text-gray-600');
            button.classList.add('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');

            const target = button.getAttribute('data-target');
            document.getElementById(target).classList.remove('hidden');
            document.getElementById(target).classList.add('block');
            });
        });
        </script>

    `,
        category: 'Interactive',
    });

    editor.BlockManager.add('modal-popup', {
        label: 'Modal Popup',
        content: `
        <!-- Trigger Button -->
        <div class="text-center my-6">
        <button id="openModalBtn"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Open Modal
        </button>
        </div>

        <!-- Modal Overlay -->
        <div id="exampleModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div class="flex items-center justify-between px-4 py-3 border-b">
            <h5 class="text-lg font-semibold">Modal Title</h5>
            <button id="closeModalBtn" class="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
            </div>
            <div class="p-4">
            Modal content goes here.
            </div>
            <div class="flex justify-end gap-2 px-4 py-3 border-t">
            <button id="closeModalBtn2"
                    class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
                Close
            </button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Save changes
            </button>
            </div>
        </div>
        </div>

        <!-- Modal Logic -->
        <script>
        const openBtn = document.getElementById('openModalBtn');
        const modal = document.getElementById('exampleModal');
        const closeBtns = [document.getElementById('closeModalBtn'), document.getElementById('closeModalBtn2')];

        openBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
            modal.classList.add('hidden');
            });
        });

        // Optional: click outside to close
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
            modal.classList.add('hidden');
            }
        });
        </script>

    `,
        category: 'Interactive',
    });

    editor.BlockManager.add('countdown-timer', {
        label: 'Countdown Timer',
        content: `
        <div class="text-center my-5">
        <h3 class="text-xl font-semibold">Product Launch</h3>
        <div id="countdown" class="flex justify-center gap-4 mt-4">
            <div class="bg-gray-100 p-4 rounded min-w-[80px]">
            <div id="days" class="text-2xl font-bold">00</div>
            <div class="text-sm">Days</div>
            </div>
            <div class="bg-gray-100 p-4 rounded min-w-[80px]">
            <div id="hours" class="text-2xl font-bold">00</div>
            <div class="text-sm">Hours</div>
            </div>
            <div class="bg-gray-100 p-4 rounded min-w-[80px]">
            <div id="minutes" class="text-2xl font-bold">00</div>
            <div class="text-sm">Minutes</div>
            </div>
            <div class="bg-gray-100 p-4 rounded min-w-[80px]">
            <div id="seconds" class="text-2xl font-bold">00</div>
            <div class="text-sm">Seconds</div>
            </div>
        </div>

        <script>
            const countdownDate = new Date();
            countdownDate.setMonth(countdownDate.getMonth() + 1);

            const countdownTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(countdownTimer);
                document.getElementById("countdown").innerHTML = "EXPIRED";
                return;
            }

            document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById("hours").textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById("minutes").textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("seconds").textContent = Math.floor((distance % (1000 * 60)) / 1000);
            }, 1000);
        </script>
        </div>

    `,
        category: 'Interactive',
    });

    editor.BlockManager.add('text-scroller', {
        label: 'Text Scroller',
        content: `
       <div class="w-full overflow-hidden bg-gray-100 py-4 my-5">
            <div class="whitespace-nowrap animate-scroll-left">
                <span class="mr-12 text-lg inline-block">Important Announcement</span>
                <span class="mr-12 text-lg inline-block">Breaking News</span>
                <span class="mr-12 text-lg inline-block">Special Offer: 50% Off</span>
                <span class="mr-12 text-lg inline-block">Limited Time Deal</span>
                <span class="mr-12 text-lg inline-block">New Products Available</span>
            </div>

            <style>
                @keyframes scroll-left {
                0% {
                    transform: translateX(100%);
                }
                100% {
                    transform: translateX(-100%);
                }
                }

                .animate-scroll-left {
                animation: scroll-left 20s linear infinite;
                }
            </style>
        </div>

    `,
        category: 'Interactive',
    });

    editor.BlockManager.add('news-ticker', {
        label: 'News Ticker',
        content: `
        <div class="bg-gray-800 text-white py-2 overflow-hidden relative">
            <div class="whitespace-nowrap animate-ticker-scroll">
                <span class="inline-block px-8">Breaking News: Website Builder Launches New Features</span>
                <span class="inline-block px-8">Tech Update: AI Integration Now Available</span>
                <span class="inline-block px-8">Market Alert: Digital Trends for 2025</span>
                <span class="inline-block px-8">Event Announcement: Join Our Webinar Next Week</span>
            </div>

            <style>
                @keyframes ticker-scroll {
                0% {
                    transform: translateX(100%);
                }
                100% {
                    transform: translateX(-100%);
                }
                }

                .animate-ticker-scroll {
                animation: ticker-scroll 30s linear infinite;
                }
            </style>
            </div>

    `,
        category: 'Interactive',
    });

    editor.BlockManager.add('vertical-news-scroller', {
        label: 'Vertical News Scroller',
        content: `
        <div class="h-[300px] overflow-hidden border border-gray-300 rounded-md relative my-5">
            <div class="bg-blue-600 text-white py-2 text-center font-bold">
                Latest Updates
            </div>
            <div class="h-[calc(100%-40px)] overflow-hidden relative">
                <div class="animate-scroll-up">
                <div class="p-4 border-b border-gray-200">
                    <h5 class="m-0 mb-1 font-semibold">New Feature Released</h5>
                    <p class="m-0 text-sm text-gray-700">Our latest update includes exciting new features for all users.</p>
                </div>
                <div class="p-4 border-b border-gray-200">
                    <h5 class="m-0 mb-1 font-semibold">Upcoming Maintenance</h5>
                    <p class="m-0 text-sm text-gray-700">Scheduled maintenance will occur on March 15, 2025.</p>
                </div>
                <div class="p-4 border-b border-gray-200">
                    <h5 class="m-0 mb-1 font-semibold">New Partnership Announced</h5>
                    <p class="m-0 text-sm text-gray-700">We're excited to announce our partnership with Tech Solutions Inc.</p>
                </div>
                <div class="p-4 border-b border-gray-200">
                    <h5 class="m-0 mb-1 font-semibold">Customer Spotlight</h5>
                    <p class="m-0 text-sm text-gray-700">See how ABC Company achieved success using our platform.</p>
                </div>
                <!-- Duplicates for seamless scroll -->
                <div class="p-4 border-b border-gray-200">
                    <h5 class="m-0 mb-1 font-semibold">New Feature Released</h5>
                    <p class="m-0 text-sm text-gray-700">Our latest update includes exciting new features for all users.</p>
                </div>
                <div class="p-4 border-b border-gray-200">
                    <h5 class="m-0 mb-1 font-semibold">Upcoming Maintenance</h5>
                    <p class="m-0 text-sm text-gray-700">Scheduled maintenance will occur on March 15, 2025.</p>
                </div>
                </div>
            </div>

            <style>
                @keyframes scroll-up {
                0% {
                    transform: translateY(0);
                }
                100% {
                    transform: translateY(-50%);
                }
                }

                .animate-scroll-up {
                animation: scroll-up 20s linear infinite;
                }
            </style>
        </div>
    `,
        category: 'Interactive',
    });


    // E-commerce Category
    editor.BlockManager.add('product-card', {
        label: 'Product Card',
        content: `
        <div className="max-w-xs mx-auto my-4 relative bg-white rounded-lg shadow-md">
            <div className="absolute top-2.5 right-2.5 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                Sale
            </div>
            <img 
                src="https://via.placeholder.com/300x200" 
                className="w-full rounded-t-lg" 
                alt="Product Image" 
            />
            <div className="p-4">
                <h5 className="text-lg font-medium mb-2">Product Name</h5>
                <div className="flex justify-between items-center mb-2">
                <div>
                    <span className="text-red-600 font-bold">$49.99</span>
                    <span className="text-gray-500 line-through ml-2">$69.99</span>
                </div>
                <div className="text-yellow-400">★★★★☆</div>
                </div>
                <p className="text-gray-700 mb-4">Short product description goes here.</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Add to Cart
                </button>
            </div>
        </div>
    `,
        category: 'E-commerce',
    });

    editor.BlockManager.add('product-grid', {
        label: 'Product Grid',
        content: `
        <div className="container mx-auto px-4">
            <h2 className="text-center mb-6 text-2xl font-bold">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Product Card 1 */}
                <div className="h-full">
                <div className="bg-white rounded-lg shadow-md h-full border-0 overflow-hidden">
                    <img src="https://via.placeholder.com/300x200" className="w-full object-cover" alt="Product Image" />
                    <div className="p-4">
                    <h5 className="text-lg font-medium mb-2">Product 1</h5>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">$29.99</span>
                        <div className="text-yellow-400">★★★★★</div>
                    </div>
                    <p className="text-gray-700 mb-4">Short product description goes here.</p>
                    <button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded transition duration-300">
                        Add to Cart
                    </button>
                    </div>
                </div>
                </div>

                {/* Product Card 2 */}
                <div className="h-full">
                <div className="bg-white rounded-lg shadow-md h-full border-0 overflow-hidden">
                    <img src="https://via.placeholder.com/300x200" className="w-full object-cover" alt="Product Image" />
                    <div className="p-4">
                    <h5 className="text-lg font-medium mb-2">Product 2</h5>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">$39.99</span>
                        <div className="text-yellow-400">★★★★☆</div>
                    </div>
                    <p className="text-gray-700 mb-4">Short product description goes here.</p>
                    <button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded transition duration-300">
                        Add to Cart
                    </button>
                    </div>
                </div>
                </div>

                {/* Product Card 3 */}
                <div className="h-full">
                <div className="bg-white rounded-lg shadow-md h-full border-0 overflow-hidden">
                    <img src="https://via.placeholder.com/300x200" className="w-full object-cover" alt="Product Image" />
                    <div className="p-4">
                    <h5 className="text-lg font-medium mb-2">Product 3</h5>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">$49.99</span>
                        <div className="text-yellow-400">★★★★★</div>
                    </div>
                    <p className="text-gray-700 mb-4">Short product description goes here.</p>
                    <button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded transition duration-300">
                        Add to Cart
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `,
        category: 'E-commerce',
    });


    editor.BlockManager.add('bar-chart', {
        label: 'Bar Chart',
        content: `
        div class="relative h-64 w-full my-5">
            <canvas id="barChart"></canvas>
        </div>

            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const ctx = document.getElementById('barChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [{
                                label: 'Sales',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                });
            </script>
        `,
        category: 'Charts',
    });


    // SEO Category
    editor.BlockManager.add('seo-meta', {
        label: 'SEO Meta Tags',
        content: `
        <div className="p-3 bg-gray-100 border border-gray-200 rounded my-5">
            <h5 className="text-lg font-medium mb-3">SEO Meta Tags</h5>
            
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Enter page title (55-60 characters)" 
                maxLength="60"
                />
            </div>
            
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                rows="3" 
                placeholder="Enter meta description (150-160 characters)" 
                maxLength="160"
                ></textarea>
            </div>
            
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Focus Keywords</label>
                <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="keyword1, keyword2, keyword3" 
                />
            </div>
            
            <p className="text-sm text-gray-500">These tags will be added to your page's head section.</p>
            </div>
    `,
        category: 'SEO',
    });


    // Social Media Category
    editor.BlockManager.add('social-feed', {
        label: 'Social Media Feed',
        content: `
         <div className="max-w-md mx-auto my-5 border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-blue-500 text-white p-3 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
        </svg>
        <h5 className="m-0">Twitter Feed</h5>
      </div>
      <div className="p-3">
        <div className="mb-3 pb-3 border-b">
          <div className="flex items-center mb-2">
            <img src="https://via.placeholder.com/40" className="rounded-full mr-2" alt="Profile" />
            <div>
              <strong>User Name</strong> <span className="text-gray-500">@username</span>
              <div className="text-gray-500 text-sm">2 hours ago</div>
            </div>
          </div>
          <p>This is a sample tweet with some #hashtags and @mentions that demonstrates what your embedded social feed might look like.</p>
          <div className="flex">
            <button className="flex items-center mr-2 px-2 py-1 text-sm border border-gray-300 rounded">
              <Heart className="w-4 h-4 mr-1" /> 24
            </button>
            <button className="flex items-center mr-2 px-2 py-1 text-sm border border-gray-300 rounded">
              <MessageCircle className="w-4 h-4 mr-1" /> 5
            </button>
            <button className="flex items-center px-2 py-1 text-sm border border-gray-300 rounded">
              <Repeat className="w-4 h-4 mr-1" /> 12
            </button>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <img src="https://via.placeholder.com/40" className="rounded-full mr-2" alt="Profile" />
            <div>
              <strong>Another User</strong> <span className="text-gray-500">@anotheruser</span>
              <div className="text-gray-500 text-sm">5 hours ago</div>
            </div>
          </div>
          <p>Another sample tweet to show multiple posts in the feed. Check out this link: https://example.com</p>
          <div className="flex">
            <button className="flex items-center mr-2 px-2 py-1 text-sm border border-gray-300 rounded">
              <Heart className="w-4 h-4 mr-1" /> 18
            </button>
            <button className="flex items-center mr-2 px-2 py-1 text-sm border border-gray-300 rounded">
              <MessageCircle className="w-4 h-4 mr-1" /> 3
            </button>
            <button className="flex items-center px-2 py-1 text-sm border border-gray-300 rounded">
              <Repeat className="w-4 h-4 mr-1" /> 7
            </button>
          </div>
        </div>
      </div>
    </div>
    `,
        category: 'Social Media',
    });
}