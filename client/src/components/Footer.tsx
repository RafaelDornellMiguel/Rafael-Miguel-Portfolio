import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Rafael Dornell Miguel</h3>
          <p>Desenvolvedor de Software & Engenheiro de Dados</p>
        </div>

        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#services">Serviços</a></li>
            <li><a href="#work">Projetos</a></li>
            <li><a href="#curriculo">Currículo</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Redes Sociais</h4>
          <div className="social-icons">
            <a 
              href="https://www.linkedin.com/in/rafael-dornell-miguel/" 
              target="_blank" 
              rel="noopener"
              aria-label="LinkedIn"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
            <a 
              href="https://github.com/RafaelDornellMiguel" 
              target="_blank" 
              rel="noopener"
              aria-label="GitHub"
            >
              <i className="bx bxl-github"></i>
            </a>
            <a 
              href="https://wa.me/5547996825170" 
              target="_blank" 
              rel="noopener"
              aria-label="WhatsApp"
            >
              <i className="bx bxl-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Rafael Dornell Miguel. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
