import { useState, useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      
      <main className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-ink-raised p-6 md:p-16 border border-bone/10"
        >
          <div className="mb-8 md:mb-12">
            <h1 className="font-display text-[clamp(30px,6vw,64px)] leading-[1.05] text-bone mb-4 md:mb-6">
              Privacy Policy for <span className="text-brand-bright">Shabas</span>
            </h1>
            <div className="u-eyebrow flex items-center gap-2 text-bone-faint w-fit px-3 py-2 border border-bone/10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-bright" />
              Last updated: January 2026
            </div>
          </div>

          <div className="border-l-2 border-brand-bright bg-bone/[0.03] p-6 md:p-8 mb-10 md:mb-16 relative overflow-hidden">
                        <p className="text-bone text-[15px] md:text-[17px] leading-relaxed relative z-10">
              <strong className="text-brand-bright">Your privacy is important to us.</strong> This privacy policy explains how Shabas collects, uses, and protects your personal information when you use our mobile application.
            </p>
          </div>

          <div className="prose prose-sm md:prose-base prose-invert max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:text-bone prose-h2:text-[clamp(21px,3vw,30px)] prose-h2:leading-tight prose-h3:text-[clamp(17px,2.2vw,22px)] prose-p:text-bone-dim prose-p:leading-relaxed prose-li:text-bone-dim prose-strong:text-bone prose-strong:font-semibold prose-a:text-brand-bright prose-a:no-underline hover:prose-a:underline prose-hr:border-bone/10">
            <h2>1. Information We Collect</h2>

            <h3>1.1 Personal Information</h3>
            <p>When you create an account, we collect:</p>
            <ul>
                <li><strong>Name:</strong> To identify you in the app</li>
                <li><strong>Email address:</strong> For account management and communication</li>
                <li><strong>Phone number (optional):</strong> For team contact purposes</li>
                <li><strong>Profile picture (optional):</strong> To personalize your profile</li>
            </ul>

            <h3>1.2 Team Information</h3>
            <p>When you create or join a team, we collect:</p>
            <ul>
                <li><strong>Team name and details:</strong> To display your team</li>
                <li><strong>Team logo (optional):</strong> To represent your team</li>
                <li><strong>Team location:</strong> To help connect with nearby teams</li>
                <li><strong>Match history and statistics:</strong> To track team performance</li>
            </ul>

            <h3>1.3 Location Data</h3>
            <p>We collect location information for:</p>
            <ul>
                <li><strong>Team locations:</strong> To show where teams play</li>
                <li><strong>Nearby teams:</strong> To help you find opponents in your area</li>
                <li><strong>Match venues:</strong> To organize games at specific locations</li>
            </ul>
            <div className="bg-orange-50/50 border border-orange-100 p-3 md:p-4 rounded-xl text-xs md:text-sm italic text-gray-500 mb-6 font-medium">
                <strong>Note:</strong> Location collection is optional. You can manually enter addresses without using GPS.
            </div>

            <h3>1.4 Photos and Media</h3>
            <p>If you choose to upload photos:</p>
            <ul>
                <li><strong>Profile pictures:</strong> Stored on our servers</li>
                <li><strong>Team logos:</strong> Stored on our servers</li>
                <li><strong>Match photos (future feature):</strong> May be stored on our servers</li>
            </ul>
            <div className="bg-orange-50/50 border border-orange-100 p-3 md:p-4 rounded-xl text-xs md:text-sm italic text-gray-500 mb-6 font-medium">
                <strong>Note:</strong> We only access your camera and photo library when you explicitly choose to upload a photo.
            </div>

            <h3>1.5 Usage Data</h3>
            <p>We automatically collect:</p>
            <ul>
                <li><strong>Device information:</strong> Model, operating system, unique device identifiers</li>
                <li><strong>App usage:</strong> Features used, matches played, teams challenged</li>
                <li><strong>Error logs:</strong> To fix bugs and improve app performance</li>
            </ul>

            <hr />

            <h2>2. How We Use Your Information</h2>

            <h3>2.1 Provide App Functionality</h3>
            <ul>
                <li>Create and manage your account</li>
                <li>Connect you with other teams</li>
                <li>Organize and schedule matches</li>
                <li>Display team and player profiles</li>
                <li>Show nearby teams and match opportunities</li>
            </ul>

            <h3>2.2 Improve Our Services</h3>
            <ul>
                <li>Analyze app usage to improve features</li>
                <li>Fix bugs and technical issues</li>
                <li>Develop new features based on user needs</li>
            </ul>

            <h3>2.3 Communication</h3>
            <ul>
                <li>Send match invitations and notifications</li>
                <li>Provide customer support</li>
                <li>Send important updates about the app</li>
                <li>Respond to your inquiries</li>
            </ul>

            <hr />

            <h2>3. Information Sharing</h2>

            <h3>3.1 What We Share</h3>
            <p className="font-bold text-gray-900 border-b-2 border-primary/10 pb-2 w-fit mb-4">Public Information (visible to other users):</p>
            <ul>
                <li>Your name and profile picture</li>
                <li>Team name, logo, and general location</li>
                <li>Match history and statistics</li>
                <li>Player roster (if you're on a team)</li>
            </ul>

            <p className="font-bold text-gray-900 border-b-2 border-red-500/10 pb-2 w-fit mb-4">Not Shared:</p>
            <ul>
                <li>Your email address (private)</li>
                <li>Your phone number (private)</li>
                <li>Your precise GPS coordinates (only approximate location shown)</li>
            </ul>

            <h3>3.2 Third-Party Services</h3>
            <p>We use third-party services that may collect information:</p>
            <ul>
                <li><strong>Google Maps:</strong> For displaying maps and location services (subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>)</li>
                <li><strong>Firebase (if applicable):</strong> For analytics and crash reporting (subject to <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase's Privacy Policy</a>)</li>
            </ul>

            <div className="bg-primary text-white p-5 md:p-6 rounded-xl md:rounded-2xl my-8 flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl md:text-3xl font-black">!</span>
                </div>
                <div>
                    <h4 className="text-lg md:text-xl font-black text-white m-0 mb-1">We Do NOT Sell Your Data</h4>
                    <p className="text-white/80 m-0 text-sm md:text-base font-medium leading-snug"><strong>Important:</strong> We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
                </div>
            </div>

            <hr />

            <h2>4. Data Security</h2>

            <h3>4.1 How We Protect Your Data</h3>
            <ul>
                <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using HTTPS/TLS</li>
                <li><strong>Secure storage:</strong> Your data is stored on secure servers</li>
                <li><strong>Access controls:</strong> Only authorized personnel can access user data</li>
                <li><strong>Regular security audits:</strong> We regularly review our security practices</li>
            </ul>

            <h3>4.2 Your Responsibility</h3>
            <ul>
                <li>Keep your password secure</li>
                <li>Don't share your account credentials</li>
                <li>Log out of shared devices</li>
            </ul>

            <hr />

            <h2>5. Your Rights and Choices</h2>

            <h3>5.1 Access and Update Your Information</h3>
            <p>You can:</p>
            <ul>
                <li>View and edit your profile information in the app</li>
                <li>Update your team details at any time</li>
                <li>Change your preferences and settings</li>
            </ul>

            <h3>5.2 Delete Your Account</h3>
            <p>You have the right to delete your account and all associated data:</p>
            <ul>
                <li>Go to Settings {">"} Account {">"} Delete Account</li>
                <li>Or contact us at: <a href="mailto:shabasfootball@gmail.com">shabasfootball@gmail.com</a></li>
            </ul>
            <div className="bg-red-50 border border-red-100 p-5 md:p-6 rounded-xl md:rounded-2xl mb-8 font-medium">
                <p className="text-red-900 text-sm md:text-base m-0 leading-relaxed"><strong>Note:</strong> Deletion is permanent and cannot be undone. All your data (profile, teams, match history) will be permanently deleted within 30 days.</p>
            </div>

            <h3>5.3 Location Permissions</h3>
            <p>You can control location access:</p>
            <ul>
                <li><strong>Android:</strong> Settings {">"} Apps {">"} Shabas {">"} Permissions {">"} Location</li>
                <li>Choose: Allow all the time / Only while using the app / Don't allow</li>
            </ul>

            <h3>5.4 Camera and Photos</h3>
            <p>You can control camera/photo access:</p>
            <ul>
                <li><strong>Android:</strong> Settings {">"} Apps {">"} Shabas {">"} Permissions {">"} Camera / Storage</li>
                <li>You can revoke access at any time</li>
            </ul>

            <hr />

            <h2>6. Children's Privacy</h2>
            <p>Shabas is designed to be suitable for users of all ages, including children who play grassroots football.</p>
            <p>We do not knowingly collect personal information from children under 13 years of age without parental consent. If you are a parent or guardian and believe your child has provided us with personal information without your consent, please contact us, and we will delete it immediately.</p>

            <hr />

            <h2>7. Data Retention</h2>
            <p>We retain your information:</p>
            <ul>
                <li><strong>Active accounts:</strong> As long as your account is active</li>
                <li><strong>Deleted accounts:</strong> Deleted within 30 days of account deletion</li>
                <li><strong>Backup systems:</strong> May retain data for up to 90 days in backup systems</li>
                <li><strong>Legal requirements:</strong> Longer if required by law</li>
            </ul>

            <hr />

            <h2>8. International Users</h2>
            <p>Shabas is operated from Cameroon. If you use our app from outside Cameroon, please be aware that your information may be transferred to, stored, and processed in Cameroon where our servers are located.</p>

            <hr />

            <h2>9. Changes to This Privacy Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by:</p>
            <ul>
                <li>Posting the new privacy policy in the app</li>
                <li>Updating the "Last updated" date at the top</li>
                <li>Sending you a notification for significant changes</li>
            </ul>
            <p>Your continued use of the app after changes means you accept the updated privacy policy.</p>

            <hr />

            <h2>10. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this privacy policy or your personal data, please contact us:</p>
            
            <div className="bg-bone/[0.03] p-6 md:p-8 border border-bone/10 mt-6">
                <span className="font-display block text-[24px] md:text-[30px] leading-none text-brand-bright mb-5">Shabas</span>
                <div className="space-y-3 text-bone-dim text-sm md:text-base">
                    <p className="m-0 flex flex-wrap items-center gap-3">
                        <span className="w-8 h-8 flex items-center justify-center text-brand-bright border border-bone/15 flex-shrink-0">@</span>
                        Email: <a href="mailto:shabasfootball@gmail.com" className="text-brand-bright hover:underline break-all">shabasfootball@gmail.com</a>
                    </p>
                    <p className="m-0 flex flex-wrap items-center gap-3">
                        <span className="w-8 h-8 flex items-center justify-center text-brand-bright border border-bone/15 flex-shrink-0">w</span>
                        Website: <a href="https://sha-bas.com" className="text-brand-bright hover:underline break-all">https://sha-bas.com</a>
                    </p>
                </div>
            </div>

            <hr />

            <h2>11. Legal Basis for Processing (GDPR)</h2>
            <p>If you are in the European Economic Area (EEA), we process your personal data based on:</p>
            <ul>
                <li><strong>Consent:</strong> When you provide explicit consent (e.g., location access)</li>
                <li><strong>Contract:</strong> To provide the app services you requested</li>
                <li><strong>Legitimate interests:</strong> To improve our app and provide better services</li>
            </ul>

            <hr />

            <h2>12. Your California Privacy Rights (CCPA)</h2>
            <p>If you are a California resident, you have additional rights:</p>
            <ul>
                <li>Right to know what personal information we collect</li>
                <li>Right to know whether we sell your personal information (we don't)</li>
                <li>Right to delete your personal information</li>
                <li>Right to non-discrimination for exercising your rights</li>
            </ul>

            <div className="pt-16 pb-4 border-t border-bone/10 mt-20">
                <p className="u-eyebrow text-center text-bone-faint">
                    © 2026 Shabas. All rights reserved.
                </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
