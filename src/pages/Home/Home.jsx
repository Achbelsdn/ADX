import React from 'react'
import Hero from '../../components/Hero/Hero'
import Welcome from '../../components/Welcome/Welcome'
import Choose from '../../components/Choose/Choose'
import Wristbands from '../../components/Wristbands/Wristbands'
import StickyCols from '../../components/StickyCols/StickyCols'
import Gallery from '../../components/Gallery/Gallery'
import MarqueeText from '../../components/Marquee/MarqueeText'
import MarqueeSticky from '../../components/Layouts/MarqueeSticky'
import MapLink from '../../components/MapLink/MapLink'
import Activities from '../../components/Activities/Activities'
import Feedback from '../../components/Feedback/Feedback'
import FooterBanner from '../../components/FooterBanner/FooterBanner'
import VideoShowcase from '../../components/VideoShowcase/VideoShowcase'

const Home = () => {
    return (
        <div>
            <Hero />
            <Welcome />
            <Choose />
            <Wristbands />
            <Gallery />
            <MapLink />
            <MarqueeSticky />
            <div className="relative w-full h-0 z-50">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-50">
                    <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight uppercase select-none">Créateurs</h2>
                </div>
            </div>
            <StickyCols />
            <Activities />
            <Feedback />
            <VideoShowcase />
            <FooterBanner />
        </div>
    )
}

export default Home