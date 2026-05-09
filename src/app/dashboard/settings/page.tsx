"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setName(data.user.name);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setSuccessMessage("");

    if (!name.trim() || name.length < 2) {
      setNameError("Name must be at least 2 characters");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setNameError(data.error || "Failed to update profile");
      }
    } catch {
      setNameError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Manage your account information.
        </p>
      </div>

      {/* Profile card */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Member since {formatDate(user.createdAt)}
            </p>
          </div>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="mb-5 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-500">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleUpdateName} className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Update Profile</h3>
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            error={nameError}
            required
          />
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Email cannot be changed at this time.
            </p>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" isLoading={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {/* Account info */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Account Information</h3>
        <dl className="space-y-3">
          <div className="flex justify-between text-sm">
            <dt className="text-slate-500 dark:text-slate-400">Account ID</dt>
            <dd className="text-slate-700 dark:text-slate-300 font-mono text-xs">{user.id}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-slate-500 dark:text-slate-400">Member since</dt>
            <dd className="text-slate-700 dark:text-slate-300">{formatDate(user.createdAt)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-slate-500 dark:text-slate-400">Plan</dt>
            <dd className="text-slate-700 dark:text-slate-300">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-0.5 text-xs font-medium">
                Free Plan
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-red-200 dark:border-red-800/50 bg-white dark:bg-slate-900 p-6">
        <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Sign Out</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Sign out from your account on this device.
        </p>
        <Button
          variant="destructive"
          onClick={handleLogout}
          isLoading={isLoggingOut}
          leftIcon={
            !isLoggingOut && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
              </svg>
            )
          }
        >
          {isLoggingOut ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  );
}
