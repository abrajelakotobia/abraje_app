import { useForm } from '@inertiajs/react';
import { FormEventHandler, ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error'; // 👈 assure-toi que ce fichier fait un `export default`
import { LoaderCircle } from 'lucide-react';

interface RegisterFormProps {
    onSuccess?: () => void;
    onLoginClick?: () => void;
}

export default function RegisterForm({
    
    onLoginClick = () => {},
}: RegisterFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            forceFormData: true, // requis pour les fichiers
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('avatar', e.target.files[0]);
        }
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-6" encType="multipart/form-data">
            <div className="grid gap-6">
                {/* Nom */}
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        required
                        autoFocus
                        placeholder="Votre nom complet"
                    />
                    <InputError message={errors.name} />
                </div>

                {/* Téléphone */}
                <div className="grid gap-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        disabled={processing}
                        required
                        placeholder="Votre numéro de téléphone"
                    />
                    <InputError message={errors.phone} />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        required
                        placeholder="email@exemple.com"
                    />
                    <InputError message={errors.email} />
                </div>

                {/* Mot de passe */}
                <div className="grid gap-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        required
                        placeholder="Créez un mot de passe"
                    />
                    <InputError message={errors.password} />
                </div>

                {/* Confirmation mot de passe */}
                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirmez le mot de passe</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                        required
                        placeholder="Confirmez votre mot de passe"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                {/* Avatar */}
                <div className="grid gap-2">
                    <Label htmlFor="avatar">Photo de profil</Label>
                    <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={processing}
                    />
                    <InputError message={errors.avatar} />
                </div>

                <Button type="submit" className="mt-2 w-full" disabled={processing}>
                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Créer un compte
                </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
                Vous avez déjà un compte ?{' '}
                <button
                    type="button"
                    onClick={onLoginClick}
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 underline"
                >
                    Connectez-vous
                </button>
            </div>
        </form>
    );
}
