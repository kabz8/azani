import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { MapPin, Award, Leaf, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const featuredProducts = products?.filter(p => p.featured === 'true').slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center" data-testid="section-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight" data-testid="text-hero-title">
                  Authentic
                  <span className="text-gradient block">African</span>
                  Couture
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg" data-testid="text-hero-description">
                  Handcrafted luxury fashion from the heart of Nairobi. Each piece tells a story of heritage, craftsmanship, and modern elegance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/custom-orders">
                  <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold smooth-hover hover:bg-primary/90 text-lg" data-testid="button-hero-custom">
                    Start Custom Order
                  </button>
                </Link>
                <Link href="/ready-shop">
                  <button className="border-2 border-border text-foreground px-8 py-4 rounded-lg font-semibold smooth-hover hover:border-primary hover:text-primary text-lg" data-testid="button-hero-collections">
                    View Collections
                  </button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground" data-testid="text-stat-pieces">500+</div>
                  <div className="text-sm text-muted-foreground">Custom Pieces</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground" data-testid="text-stat-countries">50+</div>
                  <div className="text-sm text-muted-foreground">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground" data-testid="text-stat-experience">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://pixabay.com/get/gdce5d2d8e8148b79f4beffab26aaeba69a331d8893601ea0d97fe119aaed470c6bf31bc0537479b964d67a78108e2b35939234677bb4ec7b30055a552917d069_1280.jpg"
                alt="African fashion model in elegant traditional wear"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                data-testid="img-hero-model"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground" data-testid="text-location-city">Nairobi, Kenya</div>
                    <div className="text-sm text-muted-foreground">Worldwide Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-card" data-testid="section-featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6" data-testid="text-featured-title">
              Featured Collections
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-featured-description">
              Discover our signature styles blending traditional African aesthetics with contemporary luxury design
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-background" data-testid="section-brand-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-serif font-bold text-foreground mb-6" data-testid="text-story-title">
                  Our Story
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-6" data-testid="text-story-intro">
                  Born in the vibrant streets of Nairobi, Azani represents the perfect fusion of traditional African craftsmanship and contemporary luxury fashion.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-story-details">
                  For over 15 years, our master tailors have been creating bespoke pieces that celebrate African heritage while meeting the demands of modern style. Each garment tells a story of cultural pride, exceptional skill, and personal expression.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground" data-testid="text-craftsmanship-title">Master Craftsmanship</h3>
                  <p className="text-muted-foreground" data-testid="text-craftsmanship-description">Trained artisans with decades of experience in traditional tailoring techniques</p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground" data-testid="text-sustainability-title">Sustainable Materials</h3>
                  <p className="text-muted-foreground" data-testid="text-sustainability-description">Ethically sourced fabrics supporting local communities and artisans</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://pixabay.com/get/g67b5feb289386efc8217ebe4cafba993512b8b4c0a1b16c52c99c79ff1af4eb3668a1ec556be93faf1d44ac74719e05a0ed45c10e3d47c51f166372c5014223c_1280.jpg"
                alt="Master tailor working with colorful African fabrics in Nairobi workshop"
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="img-workshop"
              />
              
              <div className="absolute -top-6 -right-6 bg-accent p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-foreground" data-testid="text-experience-years">15+</div>
                  <div className="text-sm text-accent-foreground/80">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6" data-testid="text-testimonials-title">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-testimonials-description">
              Trusted by fashion enthusiasts worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-lg border border-border" data-testid="card-testimonial-1">
              <div className="flex items-center mb-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-testimonial-1-content">
                "The custom suit I ordered exceeded all expectations. The attention to detail and perfect fit made me feel incredibly confident. Azani truly understands luxury tailoring."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
                  alt="Professional headshot of James Ochieng, satisfied customer"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  data-testid="img-testimonial-1-avatar"
                />
                <div>
                  <div className="font-semibold text-foreground" data-testid="text-testimonial-1-name">James Ochieng</div>
                  <div className="text-sm text-muted-foreground" data-testid="text-testimonial-1-location">London, UK</div>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 rounded-2xl shadow-lg border border-border" data-testid="card-testimonial-2">
              <div className="flex items-center mb-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-testimonial-2-content">
                "My wedding dress was absolutely stunning! The African prints were beautifully incorporated, and the craftsmanship was impeccable. I received so many compliments."
              </p>
              <div className="flex items-center">
                <img
                  src="https://pixabay.com/get/gd715f922346c9d0d7e0463d52112fb9ac83dffcb85ed796e030198a8f40446fb8e5a9c850c206ff0bdad3c31ea722bd31b2d1db2b6a563e11afffda7df6d592b_1280.jpg"
                  alt="Elegant headshot of Amara Johnson, happy bride customer"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  data-testid="img-testimonial-2-avatar"
                />
                <div>
                  <div className="font-semibold text-foreground" data-testid="text-testimonial-2-name">Amara Johnson</div>
                  <div className="text-sm text-muted-foreground" data-testid="text-testimonial-2-location">New York, USA</div>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 rounded-2xl shadow-lg border border-border" data-testid="card-testimonial-3">
              <div className="flex items-center mb-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-testimonial-3-content">
                "Outstanding quality and service! The team understood exactly what I wanted and delivered beyond my expectations. The shipping to Canada was fast and secure."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
                  alt="Professional headshot of David Kim, satisfied international customer"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  data-testid="img-testimonial-3-avatar"
                />
                <div>
                  <div className="font-semibold text-foreground" data-testid="text-testimonial-3-name">David Kim</div>
                  <div className="text-sm text-muted-foreground" data-testid="text-testimonial-3-location">Toronto, Canada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background" data-testid="section-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6" data-testid="text-gallery-title">
              Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-gallery-description">
              A glimpse into our world of creativity and craftsmanship
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://pixabay.com/get/g5a6e1f0afcd4f282bc4965b26b235dbc9623fa465a27f04fabb7aaee32316165a5a506d4aa3f28031189f163a603b51ed1bed54b3fe90c79224b4271b6517bfc_1280.jpg",
              "https://pixabay.com/get/g33c71884b0a20a568335bfdff97ae57ff140f2f5e45728bb49e6f4fa237fbcf10508dfcc3cf227b94849a787605d61c01f4014d8f239d2c251fa370464112ca9_1280.jpg",
              "https://pixabay.com/get/g3e48e4e33df770aa40765dece6fa465e12250761a811650e37ae237df951d2fd243abca87953e927811b8f0ed2e019ca484355b746b7f1b38dd84915116e1fc6_1280.jpg",
              "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
              "https://pixabay.com/get/g87a59e2eb263c9bf7d2fc71c9800e5547cd27fb367cde866cb31ea0074cd1b9d7b0f26d2f00007d539e87967e98b97d7c26e80c46e53ce5f79ec56c9a7f0b31d_1280.jpg",
              "https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
            ].map((src, index) => (
              <div key={index} className="group cursor-pointer" data-testid={`img-gallery-${index}`}>
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-40 md:h-60 object-cover rounded-xl group-hover:scale-105 smooth-hover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
