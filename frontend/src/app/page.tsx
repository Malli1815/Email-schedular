"use client";

import { Mail, Zap, Shield, Chrome, ArrowRight, Check, Star, Globe, Sparkles, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (type: 'google' | 'demo') => {
    setIsLoading(true);
    try {
      if (type === 'google') {
        window.location.href = 'http://localhost:5000/auth/login';
      } else {
        const response = await fetch('http://localhost:5000/auth/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('token', data.token);
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error(`${type} login error:`, error);
      alert('Authentication failed. Ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#030303',
      color: 'white',
      overflowX: 'hidden',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    },
    mesh: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 10% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 40%)',
      pointerEvents: 'none',
      zIndex: 0,
    },
    glow1: {
      position: 'absolute',
      top: '10%',
      left: '5%',
      width: '600px',
      height: '600px',
      backgroundColor: 'rgba(99, 102, 241, 0.08)',
      borderRadius: '50%',
      filter: 'blur(120px)',
      pointerEvents: 'none',
    },
    glow2: {
      position: 'absolute',
      bottom: '10%',
      right: '5%',
      width: '500px',
      height: '500px',
      backgroundColor: 'rgba(168, 85, 247, 0.08)',
      borderRadius: '50%',
      filter: 'blur(120px)',
      pointerEvents: 'none',
    },
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      padding: '24px 32px',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      backgroundColor: 'rgba(3, 3, 3, 0.7)',
      display: 'flex',
      justifyContent: 'center'
    },
    navInner: {
      maxWidth: '1200px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.3)'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 900,
      letterSpacing: '-0.05em'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    },
    navLink: {
      fontSize: '11px',
      fontWeight: 700,
      color: '#9CA3AF',
      textDecoration: 'none',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      transition: 'color 0.3s'
    },
    main: {
      position: 'relative',
      zIndex: 10,
      paddingTop: '160px',
      paddingBottom: '80px',
      paddingLeft: '24px',
      paddingRight: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1
    },
    heroSection: {
      maxWidth: '1200px',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
      gap: '80px',
      alignItems: 'center'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '100px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      fontSize: '10px',
      fontWeight: 900,
      color: '#818cf8',
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      marginBottom: '40px'
    },
    heroTitle: {
      fontSize: '84px',
      fontWeight: 900,
      lineHeight: '0.9',
      letterSpacing: '-0.06em',
      marginBottom: '40px',
      color: 'white'
    },
    gradientText: {
      background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#9CA3AF',
      lineHeight: '1.6',
      maxWidth: '540px',
      fontWeight: 500,
      marginBottom: '48px'
    },
    demoTrack: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      marginBottom: '48px'
    },
    avatarGroup: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '12px'
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '2px solid #030303',
      marginLeft: '-12px',
      backgroundColor: '#1f2937',
      overflow: 'hidden'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      paddingTop: '32px',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    },
    statLabel: {
      fontSize: '10px',
      fontWeight: 700,
      color: '#4b5563',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      marginTop: '8px'
    },
    mockup: {
      position: 'relative',
    },
    mockupGlass: {
      position: 'relative',
      backgroundColor: 'rgba(10, 10, 10, 0.8)',
      borderRadius: '40px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '40px',
      aspectRatio: '16/10',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)',
      overflow: 'hidden'
    },
    footerContainer: {
      width: '100%',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '80px 0',
      marginTop: 'auto'
    },
    footerInner: {
      maxWidth: '1200px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 auto',
      padding: '0 32px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mesh}></div>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Mail style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <span style={styles.logoText}>Reach<span style={{ color: '#818cf8' }}>Inbox</span></span>
          </div>
          <div style={styles.navLinks}>
            <a href="#" style={styles.navLink}>Features</a>
            <a href="#" style={styles.navLink}>Solutions</a>
            <a href="#" style={styles.navLink}>Pricing</a>
            <Button variant="secondary" size="sm" onClick={() => handleLogin('demo')}>Sign In</Button>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.heroSection}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={styles.badge}>
              <Sparkles style={{ width: '12px', height: '12px' }} /> v2.0 is now live
            </div>

            <h1 style={styles.heroTitle}>
              Scale your <br />
              <span style={styles.gradientText}>outreach</span> <br />
              with precision.
            </h1>

            <p style={styles.heroSubtitle}>
              The enterprise-grade email scheduler built for high-growth teams.
              Automate your workflow, track engagement, and close more deals.
            </p>

            <div style={styles.demoTrack}>
              <Button size="lg" onClick={() => handleLogin('google')} isLoading={isLoading}>
                <Chrome style={{ width: '20px', height: '20px', marginRight: '12px' }} /> Get Started with Google
              </Button>

              <div style={styles.avatarGroup}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={styles.avatar}>
                    <img src={`https://ui-avatars.com/api/?name=U${i}&background=random&color=fff`} alt="user" style={{ width: '100%', height: '100%' }} />
                  </div>
                ))}
                <div style={{ ...styles.avatar, backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>+2k</div>
              </div>
            </div>

            <div style={styles.stats}>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'white' }}>99.9%</div>
                <div style={styles.statLabel}>Delivery Rate</div>
              </div>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'white' }}>45%</div>
                <div style={styles.statLabel}>Avg. Open Rate</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={styles.mockup}
          >
            <div style={styles.mockupGlass}>
              <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(99, 102, 241, 0.15)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Zap style={{ width: '40px', height: '40px', color: '#818cf8' }} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.04em', margin: 0, textAlign: 'center', color: 'white' }}>Optimized Backend</h3>
              <p style={{ color: '#6b7280', textAlign: 'center', maxWidth: '300px', marginTop: '12px', fontSize: '14px' }}>Powered by BullMQ and Redis for massive scale and reliability.</p>

              <div style={{ position: 'absolute', top: '20px', left: '20px', width: '180px', height: '60px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', padding: '12px' }}>
                <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(99,102,241,0.2)', borderRadius: '100px', marginBottom: '6px' }}></div>
                <div style={{ width: '60%', height: '4px', backgroundColor: 'rgba(99,102,241,0.1)', borderRadius: '100px' }}></div>
              </div>
              <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '180px', height: '60px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', padding: '12px' }}>
                <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(168,85,247,0.2)', borderRadius: '100px', marginBottom: '6px' }}></div>
                <div style={{ width: '40%', height: '4px', backgroundColor: 'rgba(168,85,247,0.1)', borderRadius: '100px' }}></div>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '40px', backgroundColor: '#0a0a0a', padding: '24px 48px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', alignItems: 'center', whiteSpace: 'nowrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}><Globe style={{ width: '14px', height: '14px' }} /><span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Global</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}><Shield style={{ width: '14px', height: '14px' }} /><span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Security</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}><Star style={{ width: '14px', height: '14px' }} /><span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Top Tier</span></div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <section id="features" style={{ maxWidth: '1200px', width: '100%', marginTop: '160px' }}>
          <div style={styles.badge}>Powerful Capabilities</div>
          <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '64px', letterSpacing: '-0.04em', color: 'white' }}>Engineered for <span style={styles.gradientText}>Performance</span>.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { title: 'Smart Scheduling', desc: 'Precise delivery with timezone-aware queuing and retry logic.', icon: Clock },
              { title: 'AI Orchestration', desc: 'Generate high-converting copy in seconds with our intelligence engine.', icon: Sparkles },
              { title: 'Global Infrastructure', desc: 'Redundant nodes across 20+ regions ensuring 99.9% uptime.', icon: Globe }
            ].map((f, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '40px', transition: 'all 0.3s' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <f.icon style={{ width: '24px', height: '24px', color: '#818cf8' }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px', color: 'white' }}>{f.title}</h3>
                <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '15px' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" style={{ maxWidth: '1200px', width: '100%', marginTop: '160px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '80px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
             <div style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: '40px', padding: '64px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <Shield style={{ width: '64px', height: '64px', color: '#a855f7', marginBottom: '32px' }} />
                <h2 style={{ fontSize: '40px', fontWeight: 900, color: 'white', marginBottom: '24px', letterSpacing: '-0.03em' }}>Enterprise Solutions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {['SOC2 Type II Compliant', 'Zero-trust architecture', 'GDPR Ready', 'Custom retention policies'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9CA3AF', fontWeight: 600 }}>
                      <Check style={{ width: '18px', height: '18px', color: '#10b981' }} /> {t}
                    </div>
                  ))}
                </div>
             </div>
          </div>
          <div>
            <div style={styles.badge}>Scalability First</div>
            <h2 style={{ fontSize: '48px', fontWeight: 900, color: 'white', marginBottom: '32px', letterSpacing: '-0.04em' }}>Built for teams of <span style={styles.gradientText}>all sizes</span>.</h2>
            <p style={{ color: '#6B7280', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
              Whether you are a startup sending your first thousand emails or an enterprise scaling to millions, ReachInbox provides the reliability you need.
            </p>
            <Button size="lg" onClick={() => handleLogin('demo')}>Explore Solutions <ArrowRight style={{ marginLeft: '12px' }} /></Button>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" style={{ maxWidth: '1200px', width: '100%', marginTop: '160px', textAlign: 'center' }}>
          <div style={{ ...styles.badge, margin: '0 auto 40px' }}>Transparent Pricing</div>
          <h2 style={{ fontSize: '48px', fontWeight: 900, color: 'white', marginBottom: '64px', letterSpacing: '-0.04em' }}>Choose your <span style={styles.gradientText}>velocity</span>.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { name: 'Starter', price: '$0', features: ['1k emails/month', 'Basic scheduling', 'Community support'] },
              { name: 'Professional', price: '$49', features: ['50k emails/month', 'AI Writer Access', 'Priority retries', 'Custom webhooks'], popular: true },
              { name: 'Enterprise', price: 'Custom', features: ['Unlimited scale', 'Dedicated support', 'On-premise options'] }
            ].map((p, i) => (
              <div key={i} style={{ backgroundColor: p.popular ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.02)', border: p.popular ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(255,255,255,0.05)', borderRadius: '40px', padding: '48px', position: 'relative', overflow: 'hidden' }}>
                {p.popular && <div style={{ position: 'absolute', top: '24px', right: '-30px', backgroundColor: '#6366f1', color: 'white', padding: '4px 40px', fontSize: '10px', fontWeight: 900, transform: 'rotate(45deg)' }}>POPULAR</div>}
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>{p.name}</div>
                <div style={{ fontSize: '64px', fontWeight: 900, color: 'white', marginBottom: '32px' }}>{p.price}<span style={{ fontSize: '16px', color: '#4b5563', fontWeight: 600 }}>{p.price !== 'Custom' ? '/mo' : ''}</span></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', textAlign: 'left' }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#9CA3AF' }}>
                      <Check style={{ width: '16px', height: '16px', color: '#818cf8' }} /> {f}
                    </div>
                  ))}
                </div>
                <Button variant={p.popular ? 'primary' : 'secondary'} style={{ width: '100%' }} onClick={() => handleLogin('demo')}>Get Started</Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div style={styles.footerContainer}>
        <footer style={styles.footerInner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.5 }}>
            <Mail style={{ width: '20px', height: '20px', color: 'white' }} />
            <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.02em', color: 'white' }}>ReachInbox</span>
          </div>
          <div style={{ color: '#4b5563', fontSize: '12px', fontWeight: 700 }}>© 2024 ReachInbox Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Twitter', 'LinkedIn', 'GitHub'].map(s => (
              <a key={s} href="#" style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#4b5563', textDecoration: 'none' }}>{s}</a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
