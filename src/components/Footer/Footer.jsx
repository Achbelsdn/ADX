import { FaBehance } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaDribbble } from "react-icons/fa";

import MarqueeText from '../Marquee/MarqueeText';

const Footer = () => {
    return (
        <section className='w-full h-dvh px-6 pt-10 bg-[#000000] flex flex-col'>
            <p className='text-[.7rem] text-[#FFFFFF] choose-subtitle'>Envie d'un site web immersif ?<br />Contactez ADX<span>®</span></p>
            <div>
                <MarqueeText />
            </div>

            <div className='flex justify-between items-center text-2xl mt-14'>
                <h3 className='text-[#FFFFFF]'>ADX® est une agence de développement web<br />
                    spécialisée dans les expériences<br />
                    immersives 3D au Bénin.<br /><br />
                    Vous avez un projet digital ambitieux ?<br />
                    —<a href="#" className='text-[#FFFFFF] hover:text-[#6D001A] underline'> contactez-nous.</a>
                </h3>

                <div className='flex flex-col justify-center items-end'>
                    <a href="#accueil" className='text-[#FFFFFF] text-2xl'>Accueil</a>
                    <a href="#a-propos" className='text-[#FFFFFF] text-2xl'>À propos</a>
                    <a href="#services" className='text-[#FFFFFF] text-2xl'>Services</a>
                    <a href="#pourquoi-adx" className='text-[#FFFFFF] text-2xl'>Pourquoi ADX®</a>
                    <a href="#nos-formules" className='text-[#FFFFFF] text-2xl'>Nos formules</a>
                    <a href="#temoignages" className='text-[#FFFFFF] text-2xl'>Témoignages</a>
                </div>
            </div>

            <div className="w-full flex justify-between items-center mt-20">
                <div className="flex justify-center items-center gap-1">
                    <div className='border-[1px] border-[#6D001A] rounded-full p-3 text-[#FFFFFF]'><FaBehance className="text-xl" /></div>
                    <div className='border-[1px] border-[#6D001A] rounded-full p-3 text-[#FFFFFF]'><FaInstagram className="text-xl" /></div>
                    <div className='border-[1px] border-[#6D001A] rounded-full p-3 text-[#FFFFFF]'><CiLinkedin className="text-xl" /></div>
                    <div className='border-[1px] border-[#6D001A] rounded-full p-3 text-[#FFFFFF]'><FaDribbble className="text-xl" /></div>
                </div>

                <div>
                    <p className="text-[0.8rem] text-[#FFFFFF] text-right">
                        Découvrez ADX® — votre partenaire digital<br />
                        pour des sites web immersifs 3D au Bénin.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer;