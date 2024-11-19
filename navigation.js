export const showSection = (sectionToShow) => {
  document.querySelectorAll("section").forEach((section) => {
    if (section.id === sectionToShow) {
      section.style.display = "block";
      history.pushState(null, '', `#${sectionToShow}`);
    } else {
      section.style.display = "none";
    }
  });
};

export const handleNavigation = () => {
  const currentSection = window.location.hash.replace('#','') || 'accueil';
  showSection(currentSection);
  if (currentSection === 'avis') { 
    avisDisplay(); 
    }
};