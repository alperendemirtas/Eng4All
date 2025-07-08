"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/actions/auth-actions";
import { useToast } from "@/hooks/use-toast";

// Form gönderilirken butonu devre dışı bırakmak ve "Yükleniyor..." metni göstermek için ayrı bir bileşen.
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full h-12 bg-[#58cc02] hover:bg-[#46a302] text-white font-bold text-lg rounded-xl"
      disabled={pending}
    >
      {pending ? "GİRİŞ YAPILIYOR..." : "GİRİŞ YAP"}
    </Button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(signIn, undefined);
  const { toast } = useToast();

  // Server action'dan bir hata mesajı dönerse, bunu bir toast bildirimiyle göster.
  useEffect(() => {
    if (state?.error) {
      toast({
        title: "Giriş Başarısız",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-[#4b4b4b] mb-6">Giriş Yap</h2>

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#4b4b4b]">
            E-posta
          </Label>
          <Input
            id="email"
            name="email" // name özelliği form verisine eklenmesi için gerekli
            type="email"
            placeholder="E-posta adresiniz"
            className="h-12 border-[#e5e5e5] rounded-xl focus:border-[#58cc02] focus:ring-[#58cc02]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#4b4b4b]">
            Şifre
          </Label>
          <Input
            id="password"
            name="password" // name özelliği form verisine eklenmesi için gerekli
            type="password"
            placeholder="Şifreniz"
            className="h-12 border-[#e5e5e5] rounded-xl focus:border-[#58cc02] focus:ring-[#58cc02]"
            required
          />
        </div>

        {/* Hata mesajını form içinde de gösterebiliriz (isteğe bağlı) */}
        {state?.error && (
          <p className="text-sm text-red-500">{state.error}</p>
        )}

        <SubmitButton />

        <div className="text-center">
          <a href="/forgot-password" className="text-[#1cb0f6] hover:underline text-sm">
            Şifremi unuttum
          </a>
        </div>
        
        <div className="text-center my-4 overflow-hidden" style={{ position: "relative", maxWidth: "100%" }}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                width: "100%",
                borderTop: "1px solid #e5e5e5",
                transform: "translateY(-50%)",
              }}
            ></div>
            <span
              style={{
                position: "relative",
                display: "inline-block",
                padding: "0 10px",
                backgroundColor: "white",
                color: "#afafaf",
                fontSize: "0.875rem",
              }}
            >
              veya
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 border-[#e5e5e5] text-[#4b4b4b] font-bold rounded-xl hover:bg-[#f7f7f7]"
          onClick={() => alert("Google ile giriş özelliği yakında!")} 
        >
          Google ile devam et
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 border-[#e5e5e5] text-[#4b4b4b] font-bold rounded-xl hover:bg-[#f7f7f7]"
          onClick={() => alert("Facebook ile giriş özelliği yakında!")} 
        >
          Facebook ile devam et
        </Button>

        <div className="text-center pt-2">
          <span className="text-[#afafaf]">
            Hesabınız yok mu?{" "}
            <a href="/register" className="text-[#1cb0f6] hover:underline">
              Kaydol
            </a>
          </span>
        </div>
      </form>
    </div>
  )
}

export { LoginForm }
