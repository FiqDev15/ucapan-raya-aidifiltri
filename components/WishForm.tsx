"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Wish } from "@/lib/supabase";

interface WishFormProps {
  onWishAdded: (wish: Wish) => void;
}

export default function WishForm({ onWishAdded }: WishFormProps) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Sila masukkan nama anda");
      return;
    }
    if (!message.trim()) {
      toast.error("Sila masukkan ucapan anda");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), message: message.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Ucapan anda telah dihantar! ✨");
      onWishAdded(data.wish);
      setUsername("");
      setMessage("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ralat berlaku. Cuba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="glass-card-dark p-8 md:p-10 green-glow relative overflow-hidden">
        {/* Decorative corner ornaments */}
        <div className="absolute top-3 left-3 text-yellow-400 opacity-40 text-lg">✦</div>
        <div className="absolute top-3 right-3 text-yellow-400 opacity-40 text-lg">✦</div>
        <div className="absolute bottom-3 left-3 text-yellow-400 opacity-40 text-lg">✦</div>
        <div className="absolute bottom-3 right-3 text-yellow-400 opacity-40 text-lg">✦</div>

        {/* Form header */}
        <div className="text-center mb-7">
          <h2
            className="text-gold text-xl font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Tinggalkan ucapan raya di sini
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-green-300 mb-2 ml-1"
            >
              Nama
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nama anda.."
              maxLength={50}
              className="form-input"
              disabled={loading}
              autoComplete="off"
            />
          </div>

          {/* Message field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-green-300 mb-2 ml-1"
            >
              Ucapan Hari Raya
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan raya anda di sini"
              maxLength={500}
              rows={4}
              className="form-input resize-none"
              disabled={loading}
            />
            <p className="text-xs text-green-500 mt-1 ml-1 text-right opacity-60">
              {message.length}/500
            </p>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="btn-gold w-full flex items-center justify-center gap-3 py-4"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Menghantar...
              </>
            ) : (
              <>
                <span>✨</span>
                Hantar Ucapan
                <span>✨</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
