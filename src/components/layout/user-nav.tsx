'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile';

type MenuItem = {
  label: string;
  href: string;
};

const userMenuItems: MenuItem[] = [
  { label: 'Perfil', href: '/dashboard/profile' }
];

export function UserNav() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) return null;

  const handleNavigation = (href: string) => router.push(href);
  const handleSignOut = () => signOut({ callbackUrl: '/login' });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-8 cursor-pointer rounded-full'
        >
          <UserAvatarProfile user={session.user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>
              {session.user.fullName}
            </p>
            <p className='text-muted-foreground text-xs leading-none'>
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {userMenuItems.map(({ label, href }) => (
            <DropdownMenuItem key={href} onClick={() => handleNavigation(href)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
