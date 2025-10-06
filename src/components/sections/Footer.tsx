import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "About Us",
      description:
        "The team comprises Amish Rahman and Anish Kumar Patra, 2nd-year B.Tech students at NMAMIT. This project is developed for ACEathon 2025 to showcase innovative solutions in technology. We are passionate about creating impactful, user-friendly applications that address real-world challenges and inspire creativity. Through this project, we aim to explore cutting-edge technologies, refine our skills, and contribute meaningfully to the tech community.",
      links: []
    }
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"
              >
                <Heart className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  HackOps HealthHub
                </h3>
                <p className="text-sm text-muted-foreground">Your Health, Simplified</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              Revolutionizing healthcare management through intelligent technology, 
              accessibility, and user-centered design. Your health journey starts here.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>amishrahmanind@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-secondary" />
                <span>+91-7783801730</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Karnataka, India</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Sections - Centered */}
          <div className="lg:col-span-3 flex justify-center">
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="space-y-4 text-center max-w-lg"
              >
                <h4 className="font-semibold text-foreground text-center">{section.title}</h4>

                {section.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    {section.description}
                  </p>
                )}

                {section.links && section.links.length > 0 && (
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <motion.a
                          href={link.href}
                          whileHover={{ x: 4 }}
                          className="text-muted-foreground hover:text-primary transition-colors text-sm"
                        >
                          {link.name}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="my-8 opacity-50" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-muted-foreground"
          >
            © {currentYear} HackOps HealthHub. All rights reserved. | Built with ❤️ for better health.
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-muted/50 hover:bg-primary/10 rounded-lg flex items-center justify-center group transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Health Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 p-4 bg-muted/20 rounded-lg border border-border/30"
        >
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <strong>Medical Disclaimer:</strong> This platform is for informational purposes only and should not replace professional medical advice. 
            Always consult with qualified healthcare providers for medical decisions. In case of emergency, contact your local emergency services immediately.
          </p>
        </motion.div>
      </div>

      {/* Floating Health Icon */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary cursor-pointer z-50"
      >
        <Heart className="w-6 h-6 text-primary-foreground animate-pulse-medical" />
      </motion.div>
    </footer>
  );
};

export default Footer;
