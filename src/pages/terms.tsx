// pages/terms.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Terms.module.css';

export default function Terms() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const handleBack = () => {
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Terms of Service - Haris News</title>
        <meta name="description" content="Terms of Service for Haris News" />
      </Head>
      
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>HARIS NEWS</h1>
            <h2 className={styles.subtitle}>TERMS OF SERVICE</h2>
            <p className={styles.date}>Last Updated: May 18, 2025</p>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. ACCEPTANCE OF TERMS</h2>
              <p className={styles.text}>
                Welcome to Haris News. These Terms of Service ("Terms") govern your access to and use of the Haris News platform, 
                including our website, mobile applications, and all services offered by Haris News (collectively, the "Service"). 
                By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, 
                please do not access or use the Service.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>2. CHANGES TO TERMS</h2>
              <p className={styles.text}>
                We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting 
                the updated Terms on our platform and updating the "Last Updated" date above. Your continued use of the Service 
                after such notice constitutes your acceptance of the modified Terms.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>3. PRIVACY POLICY</h2>
              <p className={styles.text}>
                Your privacy is important to us. Our Privacy Policy, which explains how we collect, use, and share information 
                about you, is incorporated into these Terms. By using our Service, you consent to the data practices prescribed 
                in our Privacy Policy.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>4. ACCOUNT REGISTRATION</h2>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>4.1 Account Creation</h3>
                <p className={styles.text}>
                  To access certain features of the Service, you must register for an account. You may register directly through 
                  our platform or by using third-party login services such as Google. You agree to provide accurate, current, and 
                  complete information during the registration process and to update such information to keep it accurate, current, 
                  and complete.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>4.2 Account Security</h3>
                <p className={styles.text}>
                  You are responsible for safeguarding your password and for all activities that occur under your account. 
                  You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>4.3 Third-Party Logins</h3>
                <p className={styles.text}>
                  If you choose to register or log in using a third-party service (such as Google), you authorize us to access 
                  and use certain account information from that third-party service, including but not limited to your name, 
                  email address, and profile picture in accordance with our Privacy Policy.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. USER CONTENT</h2>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>5.1 User Content Definition</h3>
                <p className={styles.text}>
                  "User Content" refers to any text, images, videos, comments, or other material that you submit, post, or display 
                  on or through the Service.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>5.2 Ownership</h3>
                <p className={styles.text}>
                  You retain ownership rights in your User Content. However, by submitting User Content to Haris News, you grant us 
                  a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, 
                  adapt, modify, publish, transmit, display, and distribute such User Content in any and all media or distribution methods.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>5.3 Content Restrictions</h3>
                <p className={styles.text}>You agree not to post User Content that:</p>
                <ul className={styles.list}>
                  <li>Violates any applicable law or regulation</li>
                  <li>Infringes upon the rights of others</li>
                  <li>Is harmful, abusive, unlawful, threatening, harassing, defamatory, obscene, or otherwise objectionable</li>
                  <li>Involves commercial activities or sales without our prior written consent</li>
                  <li>Contains malware, viruses, or other destructive code</li>
                </ul>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. INTELLECTUAL PROPERTY RIGHTS</h2>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>6.1 Service Content</h3>
                <p className={styles.text}>
                  Except for User Content, the Service and all content and materials available through the Service, including but not limited 
                  to text, graphics, logos, button icons, images, audio clips, data compilations, and software, are the property of Haris News 
                  or its licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>6.2 Limited License</h3>
                <p className={styles.text}>
                  We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal, 
                  non-commercial use.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>7. PERSONALIZED NEWS FEED</h2>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>7.1 Content Curation</h3>
                <p className={styles.text}>
                  Haris News uses algorithms to curate your personalized news feed based on your interests, reading history, and other factors. 
                  We do not guarantee that any specific content will be displayed in your feed.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>7.2 Third-Party Content</h3>
                <p className={styles.text}>
                  The Service may include articles, videos, and other content from third-party sources. Haris News is not responsible for the 
                  accuracy, completeness, or reliability of content from third-party sources.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>8. PROHIBITED USES</h2>
              <p className={styles.text}>You agree not to:</p>
              <ul className={styles.list}>
                <li>Use the Service in any manner that could disable, overburden, damage, or impair the Service</li>
                <li>Use any robot, spider, or other automatic device to access the Service</li>
                <li>Introduce any viruses, trojan horses, worms, or other material that is malicious or technologically harmful</li>
                <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service</li>
                <li>Use the Service for any purpose that is unlawful or prohibited by these Terms</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>9. TERMINATION</h2>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>9.1 Termination by You</h3>
                <p className={styles.text}>
                  You may terminate your account at any time by following the instructions on the Service or by contacting us.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>9.2 Termination by Haris News</h3>
                <p className={styles.text}>
                  We reserve the right to suspend or terminate your account and access to the Service at any time and for any reason, 
                  including, but not limited to, your breach of these Terms.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>9.3 Effect of Termination</h3>
                <p className={styles.text}>
                  Upon termination, your right to use the Service will immediately cease. All provisions of these Terms which by their nature 
                  should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>10. DISCLAIMER OF WARRANTIES</h2>
              <p className={styles.text}>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p className={styles.text}>
                WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICE 
                OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>11. LIMITATION OF LIABILITY</h2>
              <p className={styles.text}>
                IN NO EVENT SHALL HARIS NEWS, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, 
                SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN ANY WAY CONNECTED WITH YOUR USE OF THE SERVICE, WHETHER BASED ON CONTRACT, 
                TORT, STRICT LIABILITY, OR OTHERWISE, EVEN IF HARIS NEWS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>12. INDEMNIFICATION</h2>
              <p className={styles.text}>
                You agree to indemnify, defend, and hold harmless Haris News and its affiliates, officers, directors, employees, and agents 
                from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) 
                arising from or relating to:
              </p>
              <ul className={styles.list}>
                <li>Your use of the Service</li>
                <li>Your User Content</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>13. GOVERNING LAW AND JURISDICTION</h2>
              <p className={styles.text}>
                These Terms shall be governed by and construed in accordance with the laws of Indonesia, without regard to its conflict of law provisions. 
                You agree to submit to the personal and exclusive jurisdiction of the courts located within Indonesia for the resolution of any disputes 
                arising out of or relating to these Terms or your use of the Service.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>14. GENERAL PROVISIONS</h2>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>14.1 Entire Agreement</h3>
                <p className={styles.text}>
                  These Terms constitute the entire agreement between you and Haris News regarding the Service and supersede all prior agreements 
                  and understandings.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>14.2 Waiver</h3>
                <p className={styles.text}>
                  No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>14.3 Severability</h3>
                <p className={styles.text}>
                  If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining 
                  provisions shall be enforced.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>14.4 Assignment</h3>
                <p className={styles.text}>
                  You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. 
                  We may assign or transfer these Terms, at our sole discretion, without restriction.
                </p>
              </div>
              
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>14.5 Contact Information</h3>
                <p className={styles.text}>If you have any questions about these Terms, please contact us at:</p>
                <ul className={styles.list}>
                  <li>Email: novalharis88@gmail.com</li>
                  <li>Address: Kontrakan Koentjie, Perumahan Indah Sejahtera 1 Blok F No.17</li>
                </ul>
              </div>
            </section>

            <div className={styles.footer}>
              <p className={styles.footerText}>
                By using Haris News, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <button 
                onClick={handleBack}
                className={styles.button}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}