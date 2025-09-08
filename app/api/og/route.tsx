import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Add basic error handling and fallback fonts

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const title = searchParams.get('title');
    const description = searchParams.get('description');

    // Default content based on locale
    const content = {
      ar: {
        title: title || 'إتقان | مجتمع تطوير تقنيات القرآن',
        description: description || 'نهدف لبناء أكبر مجتمع لتطوير تقنيات القرآن الكريم مفتوحة المصدر',
        tagline: 'خدمة القرآن هي أعظم غايتنا'
      },
      en: {
        title: title || 'ITQAN | Quran Tech Community',
        description: description || 'Building the largest community for open-source Quran technologies',
        tagline: 'Serving Quran is our greatest Ghayah'
      }
    };

    const currentContent = content[locale as keyof typeof content] || content.en;
    const isArabic = locale === 'ar';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2d3748 50%, #1a1a1a 100%)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            position: 'relative',
            direction: isArabic ? 'rtl' : 'ltr',
          }}
        >
          {/* Simplified Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#2d3748',
              opacity: 0.1,
            }}
          />

          {/* Main Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
              maxWidth: '900px',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#669B80',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
                boxShadow: '0 20px 40px rgba(102, 155, 128, 0.3)',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {isArabic ? 'إ' : 'IT'}
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 20px 0',
                lineHeight: '1.1',
                textAlign: 'center',
                maxWidth: '800px',
              }}
            >
              {currentContent.title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '24px',
                color: '#a0a0a0',
                margin: '0 0 30px 0',
                lineHeight: '1.4',
                textAlign: 'center',
                maxWidth: '700px',
              }}
            >
              {currentContent.description}
            </p>

            {/* Tagline */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(102, 155, 128, 0.1)',
                padding: '16px 32px',
                borderRadius: '50px',
                border: '1px solid rgba(102, 155, 128, 0.3)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#669B80',
                  borderRadius: '50%',
                }}
              />
              <span
                style={{
                  fontSize: '18px',
                  color: '#669B80',
                  fontWeight: '500',
                }}
              >
                {currentContent.tagline}
              </span>
            </div>
          </div>

          {/* Bottom Brand */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#666',
              fontSize: '16px',
            }}
          >
            <span>itqan.dev</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Error generating OG image:', e);
    
    // Return a simple fallback response
    const { searchParams: fallbackParams } = new URL(request.url);
    const fallbackLocale = fallbackParams.get('locale') || 'en';
    const fallbackTitle = fallbackLocale === 'ar' ? 'إتقان' : 'ITQAN';
    
    return new Response(
      `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#1a1a1a"/>
        <text x="600" y="315" text-anchor="middle" fill="white" font-size="48" font-family="Arial, sans-serif">
          ${fallbackTitle}
        </text>
      </svg>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600',
        },
      }
    );
  }
}
