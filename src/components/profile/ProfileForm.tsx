import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, BookOpen, CheckCircle2, GraduationCap, Loader2, Save, User } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  university: z.string().min(2, 'Please specify your university or college'),
  major: z.string().min(2, 'Please enter your academic degree or major'),
  graduationYear: z.coerce
    .number()
    .min(2020, 'Year must be 2020 or later')
    .max(2035, 'Year must be realistic (up to 2035)'),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const ProfileForm: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.full_name || '',
      university: profile?.university || 'State University',
      major: profile?.major || 'Computer Science & Information Systems',
      graduationYear: profile?.graduation_year || 2026,
      bio: profile?.bio || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await updateProfile({
        full_name: data.fullName,
        university: data.university,
        major: data.major,
        graduation_year: data.graduationYear,
        bio: data.bio || null,
      });
      setSuccessMessage('Student academic profile updated successfully.');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm bg-white">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              fallbackText={profile?.full_name || 'ST'}
              src={profile?.avatar_url}
              size="lg"
              className="ring-4 ring-teal-500/20"
            />
            <div>
              <CardTitle className="text-xl text-navy-950">Academic Credentials &amp; Profile</CardTitle>
              <CardDescription className="text-xs">
                Registered identity: <span className="font-semibold text-slate-700">{profile?.email}</span> • Role: <span className="uppercase text-teal-700 font-bold">[{profile?.role}]</span>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {successMessage && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5 animate-fade-in">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5 animate-fade-in">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input id="fullName" className="pl-9" {...register('fullName')} />
              </div>
              {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="emailReadOnly">Institutional Email (Read Only)</Label>
              <Input
                id="emailReadOnly"
                type="email"
                value={profile?.email || ''}
                disabled
                className="bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="university">University / Higher Education Institution</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input id="university" className="pl-9" placeholder="e.g. Stanford University" {...register('university')} />
              </div>
              {errors.university && <p className="text-xs text-red-600">{errors.university.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="major">Degree Program / Academic Major</Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input id="major" className="pl-9" placeholder="e.g. Electrical Engineering &amp; CS" {...register('major')} />
              </div>
              {errors.major && <p className="text-xs text-red-600">{errors.major.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="graduationYear">Expected Graduation Year</Label>
            <Input id="graduationYear" type="number" {...register('graduationYear')} />
            {errors.graduationYear && <p className="text-xs text-red-600">{errors.graduationYear.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bio">Career Objective &amp; Personal Statement (Optional)</Label>
            <textarea
              id="bio"
              rows={3}
              placeholder="Brief summary of your academic interests, preferred industry sectors, and post-graduation goals..."
              className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:border-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('bio')}
            />
            {errors.bio && <p className="text-xs text-red-600">{errors.bio.message}</p>}
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500">
          Last updated: {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'Never'}
        </p>
        <Button
          type="submit"
          form="profile-form"
          disabled={isSubmitting}
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium gap-1.5 text-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving Profile...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Profile Changes
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
