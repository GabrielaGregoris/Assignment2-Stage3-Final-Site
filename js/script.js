// Scroll-based PNG sequence animation
document.addEventListener('DOMContentLoaded', function() {
    const animationImage = document.getElementById('animation-image');
    const heroSection = document.querySelector('.hero-section');
    const totalFrames = 101; // ezgif-frame-001.png to ezgif-frame-101.png

    if (!animationImage || !heroSection) {
        return;
    }
    
    function updateAnimation() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress through hero section - complete animation before element leaves viewport
        const scrollStart = heroTop;
        const scrollEnd = heroTop + heroHeight - windowHeight;
        // Complete animation when hero section is still 20% visible (finish before it fully scrolls out)
        const animationEnd = scrollEnd - (heroHeight * 0.2);
        const rawProgress = (scrollTop - scrollStart) / (animationEnd - scrollStart || 1);
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));
        
        // Accelerate the animation progress to make it spin more
        const scrollProgress = Math.pow(clampedProgress, 0.6);
        
        // Map scroll progress to frame number (1 to 101) - ensure all frames 001-101 are used
        // When scrollProgress reaches 1, we want frame 101
        const frameNumber = clampedProgress >= 1 ? totalFrames : Math.max(1, Math.floor(scrollProgress * (totalFrames - 1)) + 1);
        const paddedFrame = String(frameNumber).padStart(3, '0');
        
        // Update image source
        animationImage.src = `assets/cake_sequence_png/ezgif-frame-${paddedFrame}.png`;
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateAnimation);
    
    // Initial update
    updateAnimation();
});

// Mascot video hover play functionality
document.addEventListener('DOMContentLoaded', function() {
    const mascotVideo = document.querySelector('.mascot-video');
    
    if (!mascotVideo) {
        return;
    }
    
    // Pause video initially
    mascotVideo.pause();
    
    // Play on hover
    mascotVideo.addEventListener('mouseenter', function() {
        mascotVideo.play().catch(function(error) {
            console.log('Video play failed:', error);
        });
    });
    
    // Pause when not hovering
    mascotVideo.addEventListener('mouseleave', function() {
        mascotVideo.pause();
        mascotVideo.currentTime = 0; // Reset to beginning
    });
});




