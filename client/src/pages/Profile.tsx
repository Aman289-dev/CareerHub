import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Upload, Save, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card, Field, Input, Spinner, Alert } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProfile } from '@/store/slices/authSlice';
import { updateProfileRequest, uploadResumeRequest } from '../services/authService';
import { getAssetUrl } from '@/utils/assetUrl';
import toast from 'react-hot-toast';

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, status } = useAppSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProfile());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfileRequest({ name, phone });
      dispatch(fetchProfile());
      toast.success('Profile updated successfully');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const response = await uploadResumeRequest(file);
      if (response.success && response.data) {
        await updateProfileRequest({ resumeUrl: response.data.url });
        dispatch(fetchProfile());
        toast.success('Resume uploaded successfully');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  if (status === 'loading' && !user) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-icod-id="src_pages_profile_tsx_52a9"
      >
        <Spinner size="lg" data-icod-id="src_pages_profile_tsx_f779" />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="mx-auto max-w-3xl px-4 py-12"
        data-icod-id="src_pages_profile_tsx_399c"
      >
        <Alert variant="error" data-icod-id="src_pages_profile_tsx_915e">Please log in to view your profile</Alert>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-10"
      data-icod-id="src_pages_profile_tsx_a4e1"
    >
      <div
        className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8"
        data-icod-id="src_pages_profile_tsx_3287"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-4"
          data-icod-id="src_pages_profile_tsx_f094"
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary/10 shadow-soft"
            data-icod-id="src_pages_profile_tsx_4b77">
            <User
              className="h-7 w-7 text-primary"
              data-icod-id="src_pages_profile_tsx_ac2d"
            />
          </div>
          <div data-icod-id="src_pages_profile_tsx_145d">
            <h1
              className="text-3xl font-extrabold font-display text-foreground"
              data-icod-id="src_pages_profile_tsx_2455"
            >
              Profile
            </h1>
            <p
              className="mt-1 text-muted-foreground"
              data-icod-id="src_pages_profile_tsx_ab7f"
            >
              Manage your account settings
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-8"
          data-icod-id="src_pages_profile_tsx_f22c"
        >
          {/* Profile Info */}
          <Card className="p-8 shadow-elevated" data-icod-id="src_pages_profile_tsx_528c">
            <h2
              className="mb-6 text-xl font-bold font-display text-foreground"
              data-icod-id="src_pages_profile_tsx_8627"
            >
              Personal Information
            </h2>
            <div className="space-y-5" data-icod-id="src_pages_profile_tsx_99ca">
              <Field label="Full Name" data-icod-id="src_pages_profile_tsx_5f50">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  data-icod-id="src_pages_profile_tsx_e932"
                />
              </Field>
              <Field label="Email" data-icod-id="src_pages_profile_tsx_e83d">
                <Input
                  value={user.email}
                  disabled
                  className="bg-muted"
                  data-icod-id="src_pages_profile_tsx_852c"
                />
              </Field>
              <Field label="Phone" data-icod-id="src_pages_profile_tsx_e696">
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  data-icod-id="src_pages_profile_tsx_a3ce"
                />
              </Field>
              <Field label="Role" data-icod-id="src_pages_profile_tsx_96cd">
                <Input
                  value={user.role === 'employer' ? 'Employer' : 'Candidate'}
                  disabled
                  className="bg-muted capitalize"
                  data-icod-id="src_pages_profile_tsx_d714"
                />
              </Field>
              <Button
                onClick={handleSave}
                loading={saving}
                className="w-full sm:w-auto mt-2"
                data-icod-id="src_pages_profile_tsx_58f7"
              >
                <Save className="mr-2 h-4 w-4" data-icod-id="src_pages_profile_tsx_69d4" /> Save Changes
              </Button>
            </div>
          </Card>

          {/* Resume Section (Candidate only) */}
          {user.role === 'candidate' && (
            <Card className="p-8 shadow-elevated" data-icod-id="src_pages_profile_tsx_acca">
              <h2
                className="mb-6 text-xl font-bold font-display text-foreground"
                data-icod-id="src_pages_profile_tsx_5cc8"
              >
                Resume
              </h2>
              <div className="space-y-5" data-icod-id="src_pages_profile_tsx_1d19">
                {user.resumeUrl ? (
                  <div
                    className="flex items-center gap-4 rounded-xl border border-border/60 bg-muted/30 p-4 shadow-soft"
                    data-icod-id="src_pages_profile_tsx_8466"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent shadow-soft"
                      data-icod-id="src_pages_profile_tsx_6975">
                      <FileText
                        className="h-6 w-6 text-accent-foreground"
                        data-icod-id="src_pages_profile_tsx_9525"
                      />
                    </div>
                    <div className="flex-1 min-w-0" data-icod-id="src_pages_profile_tsx_62f2">
                      <p
                        className="truncate font-semibold text-foreground"
                        data-icod-id="src_pages_profile_tsx_57f7"
                      >
                        Current Resume
                      </p>
                      <a
                        href={getAssetUrl(user.resumeUrl) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
                        data-icod-id="src_pages_profile_tsx_4096"
                      >
                        View / Download
                      </a>
                    </div>
                  </div>
                ) : (
                  <p
                    className="text-sm text-muted-foreground"
                    data-icod-id="src_pages_profile_tsx_20c5"
                  >
                    No resume uploaded yet
                  </p>
                )}
                <div data-icod-id="src_pages_profile_tsx_e3cc">
                  <label
                    className={cn(
                      'group flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 p-6 transition-all duration-200 hover:border-primary hover:bg-accent/30 hover:shadow-soft',
                      uploading && 'pointer-events-none opacity-50'
                    )}
                    data-icod-id="src_pages_profile_tsx_dda5"
                  >
                    {uploading ? (
                      <Spinner size="sm" data-icod-id="src_pages_profile_tsx_de0c" />
                    ) : (
                      <>
                        <Upload
                          className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200"
                          data-icod-id="src_pages_profile_tsx_3604"
                        />
                        <span
                          className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200"
                          data-icod-id="src_pages_profile_tsx_45ac"
                        >
                          {user.resumeUrl ? 'Replace Resume' : 'Upload Resume'}
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                      data-icod-id="src_pages_profile_tsx_f972"
                    />
                  </label>
                  <p
                    className="mt-2 text-xs text-muted-foreground"
                    data-icod-id="src_pages_profile_tsx_0a08"
                  >
                    Accepted formats: PDF, DOC, DOCX (max 5MB)
                  </p>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
