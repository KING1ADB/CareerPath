import { authService } from '@/services/authService';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Authentication & Profile Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provisions a student profile with role strictly set to student upon signup', async () => {
    const { user, profile } = await authService.signUp(
      'newstudent@university.edu',
      'password123',
      'Jordan Lee'
    );

    expect(user).toBeDefined();
    expect(profile).toBeDefined();
    expect(profile.role).toBe('student');
    expect(profile.email).toBe('newstudent@university.edu');
    expect(profile.full_name).toBe('Jordan Lee');
  });

  it('authenticates demo student credentials successfully', async () => {
    const { user, profile } = await authService.signIn('student@careerpath.edu', 'demo1234');
    expect(user).toBeDefined();
    expect(profile.role).toBe('student');
    expect(profile.email).toBe('student@careerpath.edu');
  });

  it('authenticates demo admin credentials successfully', async () => {
    const { user, profile } = await authService.signIn('admin@careerpath.edu', 'demo1234');
    expect(user).toBeDefined();
    expect(profile.role).toBe('admin');
  });

  it('updates student academic information correctly', async () => {
    const { profile } = await authService.signIn('student@careerpath.edu', 'demo1234');
    const updated = await authService.updateProfile(profile.id, {
      university: 'Tech Institute',
      major: 'Artificial Intelligence',
      graduation_year: 2027,
    });

    expect(updated.university).toBe('Tech Institute');
    expect(updated.major).toBe('Artificial Intelligence');
    expect(updated.graduation_year).toBe(2027);
  });

  it('clears active session upon sign out', async () => {
    await authService.signIn('student@careerpath.edu', 'demo1234');
    expect(await authService.getCurrentSession()).not.toBeNull();

    await authService.signOut();
    expect(await authService.getCurrentSession()).toBeNull();
  });
});
