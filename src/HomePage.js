import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- SVG Icon Components (remain the same) ---
const FlexwrkLogo = () => (
    <svg width="32" height="32" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gradBlue" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor="#1e3a8a" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
            <linearGradient id="gradGreen" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor="#84cc16" /><stop offset="100%" stopColor="#22c55e" /></linearGradient>
             <linearGradient id="gradCyan" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
        </defs>
        <path d="M15 10 C 25 50, 35 50, 45 10 L 40 70 L 20 70 Z" fill="url(#gradBlue)" />
        <path d="M75 10 C 65 50, 55 50, 45 10 L 50 70 L 70 70 Z" fill="url(#gradGreen)" opacity="0.9" />
        <path d="M40 40 L 60 10 L 80 40 L 60 70 Z" fill="url(#gradCyan)" opacity="0.8" />
    </svg>
);
const ArrowGraphic = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', top: '20px', right: '10px', zIndex: 3, opacity: 0, animation: 'fade-in 1s ease 1s forwards'}}>
        <path d="M24 12C28 16 36 20 40 16" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42 8L40 16L32 14" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const LocationIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;
const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const InstagramIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const FacebookIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>;
const XIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const LinkedinIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.5 2.5-2.5c1.4 0 2.5 1.2 2.5 2.5s-1.1 2.5-2.5 2.5zm13.5 15h-5v-6.5c0-1.5-.5-2.5-2-2.5c-1.5 0-2 .7-2 2.5V21.5h-5v-13h5V10c1-2 2.5-3.5 4.5-3.5c3.5 0 5 2.2 5 7V21.5z"/></svg>;

// --- Data for new sections (remains the same) ---
const serviceCategories = {
    home: [{ name: 'Buy/Sell', img: 'https://placehold.co/100x100/e0f2f1/004d40?text=Buy' }, { name: 'Rent', img: 'https://placehold.co/100x100/e0f2f1/004d40?text=Rent' }, { name: 'Relocate', img: 'https://placehold.co/100x100/e0f2f1/004d40?text=Move' }, { name: 'Interiors', img: 'https://placehold.co/100x100/e0f2f1/004d40?text=Decor' }],
    education: [{ name: 'Playschools', img: 'https://placehold.co/100x100/fff3e0/e65100?text=Play' }, { name: 'Schools', img: 'https://placehold.co/100x100/fff3e0/e65100?text=School' }, { name: 'Tuitions', img: 'https://placehold.co/100x100/fff3e0/e65100?text=Tutor' }, { name: 'Colleges', img: 'https://placehold.co/100x100/fff3e0/e65100?text=College' }],
    services: [{ name: 'Cleaning', img: 'https://placehold.co/100x100/e3f2fd/01579b?text=Clean' }, { name: 'Loans', img: 'https://placehold.co/100x100/e3f2fd/01579b?text=Loan' }, { name: 'Security', img: 'https://placehold.co/100x100/e3f2fd/01579b?text=Guard' }, { name: 'Pest Control', img: 'https://placehold.co/100x100/e3f2fd/01579b?text=Pest' }]
};

const majorCities = [
    { name: 'Chennai', img: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Chennai_Central_%28Front_Entrance_-_Evening_2024%29.jpg' },
    { name: 'Bangalore', img: 'https://www.tusktravel.com/blog/wp-content/uploads/2023/05/Interesting-Facts-About-Bangalore-Karnataka.jpg' },
    { name: 'Delhi', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhEA51-7BkKMkqyBA60vzbdBNpT8Wmx7eXA&s' },
    { name: 'Ahmedabad', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-OJojPOqt8ARgHoKqtZp63FkBTfYRl_67ng&s' },
    { name: 'Hyderabad', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuWvhUZyqk_OwhNC51k06JBT9_IZ_nRq4HzQ&s' },
    { name: 'Pune', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmlMJUeK0zx0gnil1dr1TnxDGBnNwI-IYL9g&s' },
    { name: 'Mumbai', img: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Kolkata', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe_YTIK96sS-7hJLDX8dvEIXxtegn0aeBow&s' },
];

const footerLinks = {
    company: ['About Us', 'Careers', 'Media Coverage', 'Contact Us'],
    freelancers: ['Find Work', 'How to Join', 'Success Stories', 'Community'],
    resources: ['Blog', 'Privacy Policy', 'Terms & Conditions', 'Help Center'],
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const headlineText = "Hire the best freelancers for any job, online.".split(" ");

  const styles = {
    container: { fontFamily: '"Poppins", sans-serif', backgroundColor: '#afc6adff', color: '#1F2937', overflowX: 'hidden' },
    header: { display: 'flex', justifyContent: 'center', padding: '1rem 7%', position: 'sticky', top: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', zIndex: 10 },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px' },
    logoContainer: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: 'bold' },
    navLinks: { display: 'flex', alignItems: 'center', gap: '2.5rem' },
    navLink: (delay) => ({ 
        color: '#1F2937', textDecoration: 'none', fontWeight: '500', transition: 'opacity 0.5s ease, transform 0.5s ease, color 0.3s ease',
        opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)', transitionDelay: `${delay}s`,
      }),
    navButtons: { display: 'flex', alignItems: 'center', gap: '1rem' },
    button: { padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', cursor: 'pointer', fontWeight: '500', transition: 'transform 0.2s ease, box-shadow 0.2s ease' },
    buttonPrimary: { backgroundColor: '#1F2937', color: '#FFFFFF', border: 'none' },
    heroSection: { display: 'flex', justifyContent: 'center', padding: '4rem 7% 6rem', minHeight: '90vh' },
    heroContent: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', gap: '2rem' },
    heroLeft: { flex: 1.1 },
    heroRight: { flex: 1, position: 'relative', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'scale(1)' : 'scale(0.9)', transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s' },
    imageContainer: { position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', animation: isLoaded ? 'float 6s ease-in-out infinite' : 'none' },
    heroImage: { width: '100%', maxWidth: '450px', height: 'auto', borderRadius: '8px', position: 'relative', zIndex: 2, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' },
    backgroundShape: { position: 'absolute', width: '85%', height: '100%', backgroundColor: '#FEF2F2', borderRadius: '40px', transform: 'rotate(15deg)', zIndex: 1, transition: 'transform 1s ease' },
    headline: { fontSize: '3.8rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1.5rem' },
    headlineWord: (delay) => ({
        display: 'inline-block',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        transitionDelay: `${delay}s`
    }),
    subheadline: { fontSize: '1.1rem', color: '#4B5563', marginBottom: '2rem', lineHeight: 1.7, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s' },
    heroActionButtons: { display: 'flex', gap: '1rem', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease 1s, transform 0.6s ease 1s' },
    actionButton: { padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid #FEE2E2', backgroundColor: '#FFF1F2', cursor: 'pointer', fontWeight: '500', color: '#1F2937', transition: 'transform 0.2s ease, box-shadow 0.3s ease' },
    
    discoverySection: { padding: '4rem 0', backgroundColor: '#FAFAFA', position: 'relative', marginTop: '-80px' },
    searchBarContainer: { background: 'linear-gradient(45deg, #4c1d95, #8b5cf6)', padding: '2rem 7% 5rem', color: 'white' },
    searchBar: { display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '8px', padding: '0.5rem 1rem', maxWidth: '800px', margin: '0 auto', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', transform: isLoaded ? 'scale(1)' : 'scale(0.95)', transition: 'transform 0.5s ease 0.2s' },
    locationInput: { display: 'flex', alignItems: 'center', gap: '8px', color: '#4B5563', paddingRight: '1rem', borderRight: '1px solid #E5E7EB' },
    searchInput: { flex: 1, border: 'none', outline: 'none', padding: '0.5rem 1rem', fontSize: '1rem' },
    
    categoryCardsContainer: { display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', padding: '0 7%', marginTop: '-3rem', position: 'relative' },
    categoryCard: (color, delay) => ({
        backgroundColor: color, borderRadius: '16px', padding: '1.5rem', flex: 1, minWidth: '300px', maxWidth: '380px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out', transitionDelay: `${delay}s`,
        opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
    }),
    cardTitle: { fontSize: '1.4rem', fontWeight: '600', marginBottom: '1.5rem' },
    categoryGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' },
    categoryItem: { textAlign: 'center' },
    categoryImage: { width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', backgroundColor: 'white', padding: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease' },
    categoryName: { fontSize: '0.9rem', marginTop: '0.5rem' },
    viewAllLink: { color: '#4c1d95', textDecoration: 'none', fontWeight: '500' },
    
    citiesSection: { padding: '4rem 7%' },
    citiesTitle: { fontSize: '1.8rem', fontWeight: '600', marginBottom: '0.5rem' },
    citiesSubtitle: { color: '#6B7280', marginBottom: '2rem' },
    citiesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem' },
    cityCard: (delay) => ({
        textAlign: 'center', cursor: 'pointer',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out', transitionDelay: `${delay}s`,
        opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
    }),
    cityImageContainer: { borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    cityImage: { width: '100%', height: '120px', objectFit: 'cover', transition: 'transform 0.3s ease' },
    cityName: { fontWeight: '500', marginTop: '0.75rem' },
    
    footer: { backgroundColor: '#111827', color: '#D1D5DB', padding: '5rem 7% 2rem' },
    footerContent: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto 3rem auto', textAlign: 'left' },
    footerColumn: (delay) => ({ transition: 'opacity 0.5s ease-out, transform 0.5s ease-out', transitionDelay: `${delay}s`, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)' }),
    footerDescription: { lineHeight: 1.8, marginTop: '1rem' },
    socialContainer: { marginTop: '1.5rem' },
    socialIcons: { display: 'flex', gap: '1rem' },
    socialIcon: { color: '#9CA3AF', transition: 'transform 0.2s, color 0.2s' },
    footerColumnTitle: { color: '#FFFFFF', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' },
    footerLink: { display: 'block', color: '#D1D5DB', textDecoration: 'none', marginBottom: '0.75rem', transition: 'color 0.2s, padding-left 0.2s' },
    footerBottom: { borderTop: '1px solid #374151', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#9CA3AF' },
  };

  const keyframes = `
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    .nav-link:hover { color: #4c1d95; }
    .nav-button:hover { transform: scale(1.05); box-shadow: 4px 10px rgba(0,0,0,0.1); }
    .action-button:hover { transform: scale(1.05); box-shadow: 0 4px 14px rgba(254, 226, 226, 0.8); }
    .hero-right:hover .background-shape { transform: rotate(20deg) scale(1.05); }
    .category-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .category-card:hover { transform: translateY(-10px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
    .category-item:hover .category-image { transform: scale(1.1); }
    .city-card:hover .city-image { transform: scale(1.1); }
    .city-card:hover { transform: translateY(-5px) !important; }
    .social-icon:hover { transform: scale(1.2); color: #FFFFFF; }
    .footer-link:hover { color: #FFFFFF; padding-left: 5px; }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <header style={styles.header}>
            <nav style={styles.nav}>
                <div style={styles.logoContainer}><FlexwrkLogo /><span>FLEXwrk</span></div>
                <div style={styles.navLinks}>
                    <a href="#" style={styles.navLink(0.2)} className="nav-link">Home</a>
                    <a href="#" style={styles.navLink(0.3)} className="nav-link">About</a>
                    <a href="#" style={styles.navLink(0.4)} className="nav-link">Contact Us</a>
                </div>
                
                <div style={styles.navButtons}>
                    <Link to="/Signup" style={{...styles.button, ...styles.buttonPrimary}}>Sign Up </Link>
                    <Link to="/Login" style={{...styles.button, ...styles.buttonPrimary}}>Log in/Sign in</Link>
                </div>

            </nav>
        </header>

        <main>
            <section style={styles.heroSection}>
                <div style={styles.heroContent}>
                    <div style={styles.heroLeft}>
                        <h1 style={styles.headline}>
  {headlineText.map((word, index) => (
    <span key={index} style={styles.headlineWord(0.2 + index * 0.05)}>
      {word}&nbsp;
    </span>
  ))}
</h1>
                        <p style={styles.subheadline}>Discover the world's largest freelance marketplace...</p>
                        <div style={styles.heroActionButtons}>
                            <button style={styles.actionButton} className="action-button">Hire a Freelancer</button>
                            <button style={styles.actionButton} className="action-button">Earn Money Freelancing</button>
                        </div>
                    </div>
                    <div style={styles.heroRight} className="hero-right">
                        <div style={styles.imageContainer}>
                            <div style={styles.backgroundShape} className="background-shape"></div>
                            <ArrowGraphic />
                            <img src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Professional freelancer" style={styles.heroImage}/>
                        </div>
                    </div>
                </div>
            </section>
            
            <section style={styles.discoverySection}>
                <div style={styles.searchBarContainer}>
                    <div style={styles.searchBar}>
                        <div style={styles.locationInput}><LocationIcon /><span>Udupi</span></div>
                        <input type="text" placeholder="Find your service" style={styles.searchInput}/>
                        <SearchIcon color="#6B7280" />
                    </div>
                </div>
                <div style={styles.categoryCardsContainer}>
                    <div style={styles.categoryCard('#F0FDF4', 0.2)} className="category-card">
                        <h3 style={styles.cardTitle}>Home</h3>
                        <div style={styles.categoryGrid}>{serviceCategories.home.map(s => <div style={styles.categoryItem} className="category-item" key={s.name}><img src={s.img} alt={s.name} style={styles.categoryImage} className="category-image"/><p style={styles.categoryName}>{s.name}</p></div>)}</div>
                        <a href="#" style={styles.viewAllLink}>View all</a>
                    </div>
                    <div style={styles.categoryCard('#FEFCE8', 0.4)} className="category-card">
                        <h3 style={styles.cardTitle}>Education</h3>
                        <div style={styles.categoryGrid}>{serviceCategories.education.map(s => <div style={styles.categoryItem} className="category-item" key={s.name}><img src={s.img} alt={s.name} style={styles.categoryImage} className="category-image"/><p style={styles.categoryName}>{s.name}</p></div>)}</div>
                        <a href="#" style={styles.viewAllLink}>View all</a>
                    </div>
                    <div style={styles.categoryCard('#EFF6FF', 0.6)} className="category-card">
                        <h3 style={styles.cardTitle}>Services</h3>
                        <div style={styles.categoryGrid}>{serviceCategories.services.map(s => <div style={styles.categoryItem} className="category-item" key={s.name}><img src={s.img} alt={s.name} style={styles.categoryImage} className="category-image"/><p style={styles.categoryName}>{s.name}</p></div>)}</div>
                        <a href="#" style={styles.viewAllLink}>View all</a>
                    </div>
                </div>
            </section>

            <section style={styles.citiesSection}>
                <h2 style={styles.citiesTitle}>Discover Major Cities</h2>
                <p style={styles.citiesSubtitle}>Top Cities</p>
                <div style={styles.citiesGrid}>
                    {majorCities.map((city, i) => (
                        <div key={city.name} style={styles.cityCard(0.2 + i * 0.05)} className="city-card">
                            <div style={styles.cityImageContainer}>
                                <img src={city.img} alt={city.name} style={styles.cityImage} className="city-image" />
                            </div>
                            <p style={styles.cityName}>{city.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
        
        <footer style={styles.footer}>
            <div style={styles.footerContent}>
                <div style={styles.footerColumn(0.2)}>
                    <div style={styles.logoContainer}><FlexwrkLogo /><span>FLEXwrk</span></div>
                    <p style={styles.footerDescription}>A leading platform to connect talented freelancers with amazing clients. We make hiring simple, secure, and successful.</p>
                    <div style={styles.socialContainer}><p style={{fontWeight: '500'}}>Connect with us</p><div style={styles.socialIcons}><a href="#" className="social-icon" style={styles.socialIcon}><InstagramIcon/></a><a href="#" className="social-icon" style={styles.socialIcon}><FacebookIcon/></a><a href="#" className="social-icon" style={styles.socialIcon}><XIcon/></a><a href="#" className="social-icon" style={styles.socialIcon}><LinkedinIcon/></a></div></div>
                </div>
                <div style={styles.footerColumn(0.3)}><h4 style={styles.footerColumnTitle}>Company</h4>{footerLinks.company.map(link => <a key={link} href="#" className="footer-link" style={styles.footerLink}>{link}</a>)}</div>
                <div style={styles.footerColumn(0.4)}><h4 style={styles.footerColumnTitle}>For Freelancers</h4>{footerLinks.freelancers.map(link => <a key={link} href="#" className="footer-link" style={styles.footerLink}>{link}</a>)}</div>
                <div style={styles.footerColumn(0.5)}><h4 style={styles.footerColumnTitle}>Resources</h4>{footerLinks.resources.map(link => <a key={link} href="#" className="footer-link" style={styles.footerLink}>{link}</a>)}</div>
            </div>
            <div style={styles.footerBottom}><p>&copy; 2025 FLEXwrk. All Rights Reserved.</p></div>
        </footer>
      </div>
    </>
  );
}