import { motion } from 'framer-motion';
import { Music, Headphones, Users, Globe, Sparkles, Play, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { useAuthStore } from '../store/authStore';

export const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguageStore();
  const { openAuthModal, isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: Music,
      titleKey: 'landing.features.ethiopianMusic.title',
      descKey: 'landing.features.ethiopianMusic.description',
      gradient: 'from-green-500 to-yellow-500',
    },
    {
      icon: Headphones,
      titleKey: 'landing.features.highQuality.title',
      descKey: 'landing.features.highQuality.description',
      gradient: 'from-yellow-500 to-red-500',
    },
    {
      icon: Globe,
      titleKey: 'landing.features.amharicSupport.title',
      descKey: 'landing.features.amharicSupport.description',
      gradient: 'from-red-500 to-green-500',
    },
    {
      icon: Sparkles,
      titleKey: 'landing.features.offline.title',
      descKey: 'landing.features.offline.description',
      gradient: 'from-green-500 to-yellow-500',
    },
    {
      icon: Users,
      titleKey: 'landing.features.social.title',
      descKey: 'landing.features.social.description',
      gradient: 'from-yellow-500 to-red-500',
    },
    {
      icon: Play,
      titleKey: 'landing.features.curated.title',
      descKey: 'landing.features.curated.description',
      gradient: 'from-red-500 to-green-500',
    },
  ];

  const genres = [
    { key: 'landing.genres.tizita', color: 'bg-green-600' },
    { key: 'landing.genres.ambassel', color: 'bg-yellow-600' },
    { key: 'landing.genres.anchihoye', color: 'bg-red-600' },
    { key: 'landing.genres.jazz', color: 'bg-green-700' },
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      openAuthModal('signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div
        className="absolute inset-0 opacity-5 dark:opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 35px, #10b981 35px, #10b981 36px, transparent 36px, transparent 70px, #fbbf24 70px, #fbbf24 71px, transparent 71px, transparent 105px, #ef4444 105px, #ef4444 106px)`,
        }}
      />

      <div className="relative">
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Music className="text-green-600" size={28} />
                </div>
                <span className="text-white font-bold text-3xl tracking-wide">
                  {t('app.name')}
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 bg-clip-text text-transparent">
                  {t('landing.hero.title')}
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
                {t('landing.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="px-10 py-5 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3"
                >
                  {t('landing.hero.cta')}
                  <ChevronRight size={24} />
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-20 relative"
              >
                <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-gradient-to-r from-green-500 via-yellow-500 to-red-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-yellow-500/20 to-red-500/20" />
                  <img
                    src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Music"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl"
                    >
                      <Play size={40} className="text-green-600 ml-2" fill="currentColor" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-32 px-4 bg-white dark:bg-gray-900">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-center mb-20">
                <span className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 bg-clip-text text-transparent">
                  {t('landing.features.title')}
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.titleKey}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity rounded-3xl blur-xl"
                         style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-100 dark:border-gray-700 h-full">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform`}>
                        <feature.icon size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {t(feature.descKey)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-32 px-4 bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-center mb-20">
                <span className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 bg-clip-text text-transparent">
                  {t('landing.genres.title')}
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {genres.map((genre, index) => (
                  <motion.div
                    key={genre.key}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    className={`${genre.color} rounded-3xl p-8 shadow-2xl cursor-pointer group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    <h3 className="text-2xl font-bold text-white relative z-10">
                      {t(genre.key)}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-32 px-4 bg-gradient-to-r from-green-600 via-yellow-600 to-red-600">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                {t('landing.cta.title')}
              </h2>
              <p className="text-2xl text-white/90 mb-12">
                {t('landing.cta.subtitle')}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-12 py-6 bg-white text-gray-900 text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all"
              >
                {t('landing.cta.button')}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};
