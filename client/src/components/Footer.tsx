import { Github, Linkedin } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">&copy; {year} Rafael Dornell Miguel</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/rafael-dornell-miguel/" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="LinkedIn">
            <Linkedin size={14} /> LinkedIn
          </a>
          <a href="https://github.com/RafaelDornellMiguel" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="GitHub">
            <Github size={14} /> GitHub
          </a>
          <a href="https://wa.me/5547996825170" target="_blank" rel="noopener noreferrer" className="footer-link footer-link--wa" aria-label="WhatsApp">
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
