"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRouter, usePathname } from "next/navigation";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter()

  const pathname: string = usePathname();

  const matchedPathname: boolean = pathname === "/auth/signin"

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    if (localStorage.getItem('A_T') === null && localStorage.getItem('A_T') === undefined) {
      router.push('/auth/signin')
    }
  }, [router])

  return (

    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {matchedPathname ? loading ? (
            <Loader />
          ) : (

            <div className="flex h-screen overflow-hidden">

              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
              </div>
              <ToastContainer />
            </div>
          ) : loading ? (
            <Loader />
          ) : (

            <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Sidebar Start ===== --> */}
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
              <ToastContainer />
            </div>
          )}

        </div>
      </body>
    </html>
  );
}
