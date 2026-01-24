import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Image URLs
const HEADER_BG_URL = '/images/header-bg.jpg';
const TENTANGKAMI_BG_URL = '/images/tentangkami-bg.jpg';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                Kompak Satya <span className="text-primary">Buana</span>
              </span>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#home" className="hover:text-primary transition">
                Home
              </a>
              <a href="#about" className="hover:text-primary transition">
                About
              </a>
              <a href="#features" className="hover:text-primary transition">
                Features
              </a>
              <Link href="/quiz" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-opacity-90 transition">
                Start Quiz
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative w-full pt-32 pb-32 px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.65), rgba(10, 10, 10, 0.75)), url(${HEADER_BG_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '700px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Kompak Satya <span className="text-primary">Buana</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">Pusat pembelajaran Bahasa Inggris untuk calon polisi</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quiz" className="px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-lg hover:bg-opacity-90 transition transform hover:scale-105">
                Mulai Sekarang
              </Link>
              <Link href="/admin/login" className="px-8 py-4 border-2 border-primary text-primary text-lg font-semibold rounded-lg hover:bg-primary/10 transition">
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Tentang Platform Kami</h2>
              <p className="text-gray-400 text-lg mb-4 leading-relaxed">Bimbingan belajar yang secara khusus fokus mempersiapkan peserta didik untuk seleksi masuk Kepolisian Republik Indonesia (POLRI).</p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Bimbel ini hadir sebagai solusi bagi para calon anggota POLRI yang ingin memperkuat pemahaman materi dan meningkatkan kesiapan mereka dalam menghadapi berbagai tahapan seleksi, baik akademik maupun non-akademik.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-primary text-2xl font-bold">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Akses Tanpa Login</h3>
                    <p className="text-gray-400">Peserta didik dapat langsung mengerjakan soal tanpa perlu registrasi akun</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary text-2xl font-bold">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Soal Berkualitas</h3>
                    <p className="text-gray-400">Ratusan soal bahasa Inggris dari berbagai tingkat kesulitan</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary text-2xl font-bold">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Dashboard Admin</h3>
                    <p className="text-gray-400">Pantau hasil dan progress peserta didik secara real-time</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-primary/30 shadow-2xl">
              <img src={TENTANGKAMI_BG_URL || '/placeholder.svg'} alt="Tentang Kami Platform" className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Fitur Unggulan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard title="Quiz Interaktif" description="Soal pilihan ganda dengan penjelasan lengkap dan umpan balik real-time" icon="📝" />
            <FeatureCard title="Timer & Scoring" description="Sistem penilaian otomatis dengan timer untuk setiap sesi quiz" icon="⏱️" />
            <FeatureCard title="Admin Dashboard" description="Pantau setiap peserta didik yang mengerjakan quiz dan lihat statistik lengkap" icon="📊" />
            <FeatureCard title="Detailed Analytics" description="Laporan analitik mendalam tentang performa dan area yang perlu ditingkatkan" icon="📈" />
            <FeatureCard title="Secure Authentication" description="Sistem login admin yang aman dengan enkripsi password tingkat enterprise" icon="🔐" />
            <FeatureCard title="Mobile Responsive" description="Interface yang responsif dan dapat diakses dari berbagai perangkat" icon="📱" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Siap Meningkatkan Kemampuan Bahasa Inggris?</h2>
          <p className="text-xl text-gray-400 mb-8">Mulai dari sekarang dan lihat peningkatan progress Anda</p>
          <Link href="/quiz" className="inline-block px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-lg hover:bg-opacity-90 transition transform hover:scale-105">
            Mulai Latihan Sekarang
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Kompak Satya Buana</h3>
              <p className="text-gray-400 text-sm">Platform pembelajaran bahasa Inggris terpadu untuk seleksi masuk POLRI.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Student Quiz
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Admin Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Reports
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Kompak Satya Buana Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-secondary p-8 rounded-lg border border-border hover:border-primary transition group cursor-pointer">
      <div className="text-4xl mb-4 group-hover:scale-110 transition">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
