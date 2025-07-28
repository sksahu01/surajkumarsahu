// Portfolio Constants - Centralized configuration for links and data

export const CONTACT_INFO = {
    email: "surajsahu96685@gmail.com",
    phone: "+91 82492 47073",
    location: "Bhubaneswar, Odisha, India",
} as const;

export const SOCIAL_LINKS = {
    github: "https://github.com/sksahu01",
    linkedin: "https://linkedin.com/in/surajkumarsahu01",
    twitter: "https://x.com/sksahu_exe",
    instagram: "https://linkedin.com/in/surajkumarsahu01", // Update this with actual Instagram link
} as const;

export const RESUME_LINKS = {
    // Google Drive link for viewing online
    viewOnline: "https://drive.google.com/file/d/1IrpFcEI0zK76FavL0OUNVEE11e17ztBF/view?usp=sharing",
    // Direct download link - replace FILE_ID with your actual Google Drive file ID
    download: "https://drive.google.com/uc?export=download&id=1IrpFcEI0zK76FavL0OUNVEE11e17ztBF",
    // Alternative: Host your resume file in the public folder and use this
    // download: "/resume/Suraj_Kumar_Sahu_Resume.pdf",
    fileName: "Suraj_Kumar_Sahu_Resume.pdf",
} as const;

export const PERSONAL_INFO = {
    name: "Suraj Kumar Sahu",
    shortName: "SKS",
    title: "Full-Stack Developer",
    tagline: "Building digital experiences that make a difference",
    bio: "A passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through code.",
} as const;

export const SNAKE_GAME_CONFIG = {
    canvasWidth: 600,
    canvasHeight: 400,
    tileSize: 20,
    initialSpeed: 150, // milliseconds
    speedIncrement: 5, // decrease delay by this amount per food eaten
    minSpeed: 50, // minimum delay (maximum speed)
} as const;

// Navigation items
export const NAV_ITEMS = [
    { href: "/", label: "Home", icon: "Home" },
    { href: "#about", label: "About", icon: "User" },
    { href: "#projects", label: "Projects", icon: "Code" },
    { href: "#skills", label: "Skills", icon: "Briefcase" },
    { href: "#resume", label: "Resume", icon: "FileText" },
    { href: "#snake-game", label: "Snake Game", icon: "Gamepad2" },
    { href: "#contact", label: "Contact", icon: "Mail" },
] as const;
