import styled from 'styled-components';

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 15px max(18px, calc((100% - 1080px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e7eaf0;
`;

const Brand = styled.a`
  color: #182033;
  text-decoration: none;
  font-weight: 850;
  letter-spacing: -.02em;
`;

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 22px;
  a {
    color: #64748b;
    text-decoration: none;
    font-size: 14px;
    font-weight: 650;
  }
  a:hover { color: #182033; }
  @media (max-width: 650px) {
    gap: 10px;
    a:nth-child(-n+2) { display: none; }
  }
`;

export default function Header({ onThemeToggle, themeButtonStyle }) {
  return (
    <Nav>
      <Brand href="#home">AM / Portfolio</Brand>
      <Links aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
        <button onClick={onThemeToggle} style={themeButtonStyle} aria-label="Toggle visual theme">
          Theme
        </button>
      </Links>
    </Nav>
  );
}