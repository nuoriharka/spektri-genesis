'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'

interface AutoImageProps {
  src: string
  fallbackSrc: string
  alt: string
  className?: string
}

const AutoImage = ({ src, fallbackSrc, alt, className = '' }: AutoImageProps) => {
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    setImgSrc(fallbackSrc)
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={120}
      height={120}
      onError={handleError}
      className={className}
    />
  )
}

export default function SpektriFeatures() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        }
    }

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
            
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-2xl animate-pulse delay-500" />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            
            <div className="@container mx-auto max-w-7xl px-6 relative z-10">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/20 dark:border-indigo-800/30 backdrop-blur-sm mb-6">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse" />
                        <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                            Seuraavan sukupolven teknologia
                        </span>
                    </div>
                    
                    <h2 className="text-balance text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-100 dark:to-white bg-clip-text text-transparent leading-tight">
                        Yksi Alusta. <br />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Rajaton Potentiaali.
                        </span>
                    </h2>
                    
                    <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Kaikki mitä tarvitset, ilman monimutkaisuutta. Spektri.Labs yhdistää tekoälyn voiman 
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold"> intuitiiviseen käyttökokemukseen</span>.
                    </p>
                </motion.div>

                <motion.div 
                    className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-16 md:mt-24 grid max-w-4xl gap-8 md:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div variants={itemVariants}>
                        <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <CardHeader className="pb-6 pt-8 text-center relative z-10">
                                <CardDecorator>
                                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-6 group-hover:scale-110 transition-transform duration-500">
                                        <AutoImage
                                            src="/komentokeskus.png"
                                            fallbackSrc="/photos/dashboard-1.png"
                                            alt="Komentokeskus"
                                            className="w-16 h-16 object-contain mx-auto drop-shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-2xl" />
                                    </div>
                                </CardDecorator>

                                <h3 className="mt-8 text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    Komentokeskus
                                </h3>
                                
                                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-3 group-hover:w-16 transition-all duration-300" />
                            </CardHeader>

                            <CardContent className="px-8 pb-8 relative z-10">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center">
                                    Keskitetty hallintapaneeli kaikille agenteillesi. Seuraa, ohjaa ja optimoi toimintaa 
                                    <span className="font-semibold text-blue-600 dark:text-blue-400"> yhdestä paikasta</span>.
                                </p>
                                
                                <div className="mt-6 flex justify-center">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/50">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Reaaliaikainen seuranta</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <CardHeader className="pb-6 pt-8 text-center relative z-10">
                                <CardDecorator>
                                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 p-6 group-hover:scale-110 transition-transform duration-500">
                                        <AutoImage
                                            src="/meta-agentti.png"
                                            fallbackSrc="/metaorkesteroija1.png"
                                            alt="Meta-agentti"
                                            className="w-16 h-16 object-contain mx-auto drop-shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent rounded-2xl" />
                                    </div>
                                </CardDecorator>

                                <h3 className="mt-8 text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                    Meta-agentti
                                </h3>
                                
                                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-3 group-hover:w-16 transition-all duration-300" />
                            </CardHeader>

                            <CardContent className="px-8 pb-8 relative z-10">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center">
                                    Älykkäästi koordinoi muita agentteja. Jakaa tehtäviä, priorisoi työt ja varmistaa 
                                    <span className="font-semibold text-purple-600 dark:text-purple-400"> saumattoman yhteistyön</span>.
                                </p>
                                
                                <div className="mt-6 flex justify-center">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200/50 dark:border-purple-800/50">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Älykkäät päätökset</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <CardHeader className="pb-6 pt-8 text-center relative z-10">
                                <CardDecorator>
                                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 p-6 group-hover:scale-110 transition-transform duration-500">
                                        <AutoImage
                                            src="/agenttifarmit.png"
                                            fallbackSrc="/photos/agent-swarm.jpg"
                                            alt="Agenttifarmit"
                                            className="w-16 h-16 object-contain mx-auto drop-shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-2xl" />
                                    </div>
                                </CardDecorator>

                                <h3 className="mt-8 text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                    Agenttifarmit
                                </h3>
                                
                                <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-3 group-hover:w-16 transition-all duration-300" />
                            </CardHeader>

                            <CardContent className="px-8 pb-8 relative z-10">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center">
                                    Skaalautuva agenttien verkosto. Luo erikoistuneita ryhmiä tietyille tehtäville ja 
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400"> maksimoi tehokkuus</span>.
                                </p>
                                
                                <div className="mt-6 flex justify-center">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/50">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Rajaton skaalaus</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto">
        {children}
    </div>
)
