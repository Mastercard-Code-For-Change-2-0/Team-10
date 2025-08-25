import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
  home_label: 'Home',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      profile: 'Profile',
      dashboard: 'Dashboard',
      browse_donations: 'Browse Donations',
      browse_requests: 'Browse Requests',
      get_started: 'Get Started',
      explore: 'Explore',
      join_now: 'Join Now',
      learn_more: 'Learn More',
      donate_items: 'Donate Items',
      donor_dashboard: 'Donor Dashboard',
      admin_panel: 'Admin Panel',
      
      // Home page
  home: {
        hero: {
          title: 'Connect Hearts, Share Hope',
          subtitle: 'Bridge the gap between those who want to give and those who need. Join our community of changemakers today.',
        },
        features: {
          title: 'How It Works',
          subtitle: 'Our platform makes donation matching simple, transparent, and effective',
          easy_donation: {
            title: 'Easy Donation Process',
            description: 'List your items quickly with photos and descriptions. Our quality checks ensure authentic donations.',
          },
          request_items: {
            title: 'Request What You Need',
            description: 'NGOs and organizations can post their requirements with detailed specifications.',
          },
          smart_matching: {
            title: 'Smart Matching System',
            description: 'Our AI-powered system matches donations with requests automatically and efficiently.',
          },
        },
        stats: {
          active_users: 'Active Users',
          donations_made: 'Donations Made',
          lives_impacted: 'Lives Impacted',
          match_success_rate: 'Match Success Rate',
        },
        cta: {
          title: 'Ready to Make a Difference?',
          subtitle: 'Join thousands of donors and receivers creating positive impact every day.',
        },
      },
      
      // Footer
      footer: {
        about_text: 'Connecting donors with receivers to create meaningful impact in communities across India.',
        quick_links: 'Quick Links',
        for_donors: 'For Donors',
        contact_us: 'Contact Us',
        donation_guidelines: 'Donation Guidelines',
        tax_benefits: 'Tax Benefits',
        privacy_policy: 'Privacy Policy',
        terms_of_service: 'Terms of Service',
        all_rights_reserved: 'All rights reserved.',
      },
      
      // Auth
      auth: {
        welcome_back: 'Welcome Back',
        create_account: 'Create Account',
        email: 'Email Address',
        password: 'Password',
        confirm_password: 'Confirm Password',
        full_name: 'Full Name',
        phone: 'Phone Number',
        organization: 'Organization Name',
        role: 'I am a',
        donor: 'Donor',
        receiver: 'Receiver (NGO/Organization)',
        admin: 'Administrator',
        login_button: 'Sign In',
        register_button: 'Create Account',
        forgot_password: 'Forgot Password?',
        no_account: "Don't have an account?",
        have_account: 'Already have an account?',
      },
    },
  },
  hi: {
    translation: {
      // Common (Hindi)
  home_label: 'होम',
      login: 'लॉगिन',
      register: 'रजिस्टर',
      logout: 'लॉगआउट',
      profile: 'प्रोफाइल',
      dashboard: 'डैशबोर्ड',
      browse_donations: 'दान देखें',
      browse_requests: 'अनुरोध देखें',
      get_started: 'शुरू करें',
      explore: 'खोजें',
      join_now: 'अभी जुड़ें',
      learn_more: 'और जानें',
      donate_items: 'दान करें',
      donor_dashboard: 'दाता डैशबोर्ड',
      admin_panel: 'एडमिन पैनल',
      
  home: {
        hero: {
          title: 'दिलों को जोड़ें, आशा साझा करें',
          subtitle: 'उन लोगों के बीच की दूरी को कम करें जो देना चाहते हैं और जिन्हें जरूरत है। आज ही हमारे परिवर्तनकारी समुदाय में शामिल हों।',
        },
        features: {
          title: 'यह कैसे काम करता है',
          subtitle: 'हमारा मंच दान मिलान को सरल, पारदर्शी और प्रभावी बनाता है',
        },
        stats: {
          active_users: 'सक्रिय उपयोगकर्ता',
          donations_made: 'किए गए दान',
          lives_impacted: 'प्रभावित जीवन',
          match_success_rate: 'मैच सफलता दर',
        },
      },
      
      auth: {
        welcome_back: 'वापस स्वागत है',
        create_account: 'खाता बनाएं',
        email: 'ईमेल पता',
        password: 'पासवर्ड',
        full_name: 'पूरा नाम',
        role: 'मैं हूं',
        donor: 'दाता',
        receiver: 'प्राप्तकर्ता (NGO/संगठन)',
      },
    },
  },
  mr: {
    translation: {
      // Common (Marathi)
  home_label: 'होम',
      login: 'लॉगिन',
      register: 'नोंदणी',
      logout: 'लॉगआउट',
      profile: 'प्रोफाइल',
      dashboard: 'डॅशबोर्ड',
      browse_donations: 'दान पहा',
      browse_requests: 'विनंत्या पहा',
      get_started: 'सुरुवात करा',
      explore: 'शोधा',
      join_now: 'आत्ता सामील व्हा',
      learn_more: 'अधिक जाणा',
      
      home: {
        hero: {
          title: 'हृदये जोडा, आशा सामायिक करा',
          subtitle: 'ज्यांना द्यायचे आहे आणि ज्यांना गरज आहे त्यांच्यातील अंतर कमी करा.',
        },
      },
      
      auth: {
        welcome_back: 'परत स्वागत',
        create_account: 'खाते तयार करा',
        email: 'ईमेल पत्ता',
        password: 'पासवर्ड',
        full_name: 'पूर्ण नाव',
        role: 'मी आहे',
        donor: 'दाता',
        receiver: 'प्राप्तकर्ता (NGO/संस्था)',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
