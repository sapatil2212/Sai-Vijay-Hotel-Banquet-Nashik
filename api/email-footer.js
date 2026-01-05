// Centralized email footer with complete social media icons
export function createEmailFooter(hotelInfo) {
  return `
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
    <div style="margin-bottom: 15px;">
      <!-- Facebook -->
      <a href="${hotelInfo.social.facebook}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" style="width: 24px; height: 24px;">
      </a>
      
      <!-- Instagram -->
      <a href="${hotelInfo.social.instagram}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;">
      </a>
      
      <!-- YouTube -->
      <a href="${hotelInfo.social.youtube}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/1384/1384060.png" alt="YouTube" style="width: 24px; height: 24px;">
      </a>
      
      <!-- Twitter/X -->
      <a href="${hotelInfo.social.twitter}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" alt="Twitter" style="width: 24px; height: 24px;">
      </a>
      
      <!-- Pinterest -->
      <a href="${hotelInfo.social.pinterest}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733558.png" alt="Pinterest" style="width: 24px; height: 24px;">
      </a>
      
      <!-- WhatsApp -->
      <a href="https://wa.me/${hotelInfo.phone1.replace(/[^0-9]/g, '')}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733585.png" alt="WhatsApp" style="width: 24px; height: 24px;">
      </a>
      
      <!-- Google Maps -->
      <a href="https://maps.google.com/?q=${encodeURIComponent(hotelInfo.address)}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/2991/2991231.png" alt="Location" style="width: 24px; height: 24px;">
      </a>
      
      <!-- Website -->
      <a href="${hotelInfo.website}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/1006/1006771.png" alt="Website" style="width: 24px; height: 24px;">
      </a>
      
      <!-- Email -->
      <a href="mailto:${hotelInfo.email}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/542/542638.png" alt="Email" style="width: 24px; height: 24px;">
      </a>
    </div>
    <p style="color: #888; font-size: 12px; margin: 5px 0;">${hotelInfo.name}</p>
    <p style="color: #888; font-size: 12px; margin: 5px 0;">${hotelInfo.address}</p>
    <p style="color: #888; font-size: 12px; margin: 5px 0;">📞 ${hotelInfo.phone1} | ${hotelInfo.phone2}</p>
  </div>
  `;
}
