import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselItems = [
    {
      title: "Bridging Hearts, Sharing Hope",
      subtitle: "Connect donors with verified receivers for transparent, impactful giving",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d11?q=80&w=1400&auto=format&fit=crop",
      color: "#19486A"
    },
    {
      title: "Food Security for Communities",
      subtitle: "Helping families and organizations get the nutrition they need",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1400&auto=format&fit=crop",
      color: "#2d5a87"
    },
    {
      title: "Education Through Donations",
      subtitle: "Books, laptops, and learning materials reaching students in need",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1400&auto=format&fit=crop",
      color: "#1e3a5f"
    },
    {
      title: "Clothing the Community",
      subtitle: "Quality clothing donations making a difference in people's lives",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1400&auto=format&fit=crop",
      color: "#4a6741"
    },
    {
      title: "Healthcare Equipment Sharing",
      subtitle: "Medical supplies and equipment reaching healthcare providers and patients",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1400&auto=format&fit=crop",
      color: "#6b4423"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const impactStats = [
    { number: "10,000+", label: "Items Donated", icon: "📦" },
    { number: "2,500+", label: "Families Helped", icon: "👨‍👩‍👧‍👦" },
    { number: "150+", label: "Partner Organizations", icon: "🏢" },
    { number: "25", label: "Cities Covered", icon: "🌍" }
  ];

  const testimonials = [
    {
      text: "Seva Sahayog helped us connect with local schools to donate hundreds of books. The transparency in the matching process was incredible.",
      name: "Priya Sharma",
      role: "Corporate CSR Manager",
      avatar: "PS"
    },
    {
      text: "As an NGO, we've received quality donations that directly impact our community programs. The verification process ensures authentic connections.",
      name: "Rajesh Kumar",
      role: "NGO Director",
      avatar: "RK"
    },
    {
      text: "The platform made donating so simple. I could track my donated laptops all the way to the students who needed them.",
      name: "Anita Patel",
      role: "Individual Donor",
      avatar: "AP"
    }
  ];

  return (
    <main>
      {/* Hero Section with Carousel */}
      <section className="hero-carousel" style={{ 
        position: 'relative', 
        height: '100vh', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Carousel Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${carouselItems[currentSlide].color}dd, ${carouselItems[currentSlide].color}88)`,
          transition: 'all 0.8s ease-in-out'
        }}>
          <img 
            src={carouselItems[currentSlide].image}
            alt={carouselItems[currentSlide].title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.3,
              transition: 'all 0.8s ease-in-out'
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="container" style={{ 
          position: 'relative', 
          zIndex: 2, 
          color: 'white',
          textAlign: 'center',
          maxWidth: '900px'
        }}>
          <div className="chip" style={{ 
            marginBottom: 24, 
            background: 'rgba(255,255,255,0.2)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-accent)' }} />
            Transparent, Verified, Impactful Donations
          </div>
          
          <h1 style={{ 
            fontSize: '3.5rem', 
            lineHeight: 1.1, 
            margin: '0 0 24px', 
            fontWeight: 800,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.8s ease-in-out'
          }}>
            {carouselItems[currentSlide].title}
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: 0.95,
            maxWidth: '600px',
            margin: '0 auto 32px',
            transition: 'all 0.8s ease-in-out'
          }}>
            {carouselItems[currentSlide].subtitle}
          </p>
          
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" className="pill" style={{ 
              background: 'var(--brand-accent)', 
              color: '#111', 
              fontWeight: 800,
              padding: '14px 28px',
              fontSize: '1.1rem',
              boxShadow: '0 8px 32px rgba(253,202,0,0.4)',
              border: 'none'
            }}>
              Start Donating Today
            </Link>
            <Link to="/about" className="pill btn-outline" style={{ 
              fontWeight: 700,
              padding: '14px 28px',
              fontSize: '1.1rem',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.8)',
              color: 'white'
            }}>
              Learn Our Mission
            </Link>
          </div>

          {/* Carousel Indicators */}
          <div style={{ 
            display: 'flex', 
            gap: 12, 
            justifyContent: 'center', 
            marginTop: 48 
          }}>
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentSlide ? 'var(--brand-accent)' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  boxShadow: 'none'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section" style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 24px', 
            color: 'var(--brand-primary)',
            fontWeight: 800
          }}>
            Our Mission
          </h2>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#5b6b7b', 
            maxWidth: '800px', 
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Seva Sahayog is India's most trusted donation matching platform, connecting generous donors 
            with verified organizations and individuals who need support. We believe in transparency, 
            accountability, and the power of community to create lasting social impact.
          </p>
          
          {/* What We Do Cards */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            <div className="card" style={{ padding: 32, textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                position: 'absolute', 
                top: -20, 
                right: -20, 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #FDCA00, #ffd84a)', 
                opacity: 0.1 
              }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--brand-primary)', marginBottom: 16 }}>🎯 Smart Matching</h3>
              <p className="muted">Our AI-powered system intelligently matches donations with requests based on location, category, urgency, and organizational needs.</p>
            </div>
            
            <div className="card" style={{ padding: 32, textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                position: 'absolute', 
                top: -20, 
                right: -20, 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #19486A, #2d5a87)', 
                opacity: 0.1 
              }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--brand-primary)', marginBottom: 16 }}>✅ Verified Network</h3>
              <p className="muted">Every receiver organization goes through our rigorous verification process, ensuring your donations reach legitimate and impactful causes.</p>
            </div>
            
            <div className="card" style={{ padding: 32, textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                position: 'absolute', 
                top: -20, 
                right: -20, 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #4ade80, #22c55e)', 
                opacity: 0.1 
              }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--brand-primary)', marginBottom: 16 }}>📊 Full Transparency</h3>
              <p className="muted">Track your donations from listing to delivery. Get updates, photos, and impact reports so you know exactly how you're helping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section style={{ background: 'var(--bg-muted)', padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            margin: '0 0 56px', 
            color: 'var(--brand-primary)',
            fontWeight: 800
          }}>
            Our Growing Impact
          </h2>
          
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {impactStats.map((stat, index) => (
              <div key={index} className="card" style={{ 
                padding: 32, 
                textAlign: 'center',
                background: 'white',
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  color: 'var(--brand-primary)', 
                  marginBottom: 8 
                }}>
                  {stat.number}
                </div>
                <div style={{ color: '#5b6b7b', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            margin: '0 0 56px', 
            color: 'var(--brand-primary)',
            fontWeight: 800
          }}>
            How It Works
          </h2>
          
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {[
              { step: "01", title: "Create Account", desc: "Sign up as a donor or receiver. Receivers go through our verification process to ensure authenticity.", icon: "👤" },
              { step: "02", title: "List or Request", desc: "Donors post items with photos and details. Receivers submit their needs with supporting documentation.", icon: "📝" },
              { step: "03", title: "Smart Matching", desc: "Our system suggests optimal matches based on location, category, and urgency. Admins review for quality.", icon: "🤝" },
              { step: "04", title: "Secure Handover", desc: "Coordinate pickup/delivery through our platform. Track status and receive confirmation of successful donation.", icon: "✅" }
            ].map((item, index) => (
              <div key={index} className="card" style={{ 
                padding: 28, 
                textAlign: 'center', 
                position: 'relative',
                background: 'white',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  position: 'absolute',
                  top: -16,
                  left: 24,
                  background: 'var(--brand-primary)',
                  color: 'white',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 800
                }}>
                  {item.step}
                </div>
                
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  color: 'var(--brand-primary)', 
                  marginBottom: 12,
                  fontWeight: 700
                }}>
                  {item.title}
                </h3>
                <p className="muted" style={{ lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: 'var(--bg-muted)', padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            margin: '0 0 56px', 
            color: 'var(--brand-primary)',
            fontWeight: 800
          }}>
            What Our Community Says
          </h2>
          
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card" style={{ 
                padding: 32, 
                background: 'white',
                position: 'relative'
              }}>
                <div style={{ 
                  fontSize: '3rem', 
                  color: 'var(--brand-accent)', 
                  position: 'absolute', 
                  top: 16, 
                  left: 24,
                  lineHeight: 1
                }}>
                  "
                </div>
                
                <p style={{ 
                  fontStyle: 'italic', 
                  marginBottom: 24, 
                  paddingTop: 24,
                  lineHeight: 1.6,
                  color: '#374151'
                }}>
                  {testimonial.text}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--brand-primary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>
                      {testimonial.name}
                    </div>
                    <div className="muted" style={{ fontSize: '0.9rem' }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--brand-primary), #2d5a87)', 
        padding: '80px 0',
        color: 'white'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 24px', 
            fontWeight: 800
          }}>
            Ready to Make an Impact?
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Join thousands of donors and receivers who are already making a difference in their communities through Seva Sahayog.
          </p>
          
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" className="pill" style={{ 
              background: 'var(--brand-accent)', 
              color: '#111', 
              fontWeight: 800,
              padding: '16px 32px',
              fontSize: '1.1rem',
              boxShadow: '0 8px 32px rgba(253,202,0,0.4)'
            }}>
              Join as Donor
            </Link>
            <Link to="/signup" className="pill" style={{ 
              background: 'rgba(255,255,255,0.1)', 
              color: 'white',
              fontWeight: 700,
              padding: '16px 32px',
              fontSize: '1.1rem',
              border: '2px solid rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)'
            }}>
              Join as Receiver
            </Link>
          </div>
          
          {/* Admin Login Footer */}
          <div style={{ 
            marginTop: 48, 
            padding: '24px 0', 
            borderTop: '1px solid rgba(255,255,255,0.2)' 
          }}>
            <Link 
              to="/login" 
              className="muted" 
              style={{ 
                color: 'rgba(255,255,255,0.7)', 
                textDecoration: 'underline',
                fontSize: '0.9rem'
              }}
            >
              👑 Admin Access
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
