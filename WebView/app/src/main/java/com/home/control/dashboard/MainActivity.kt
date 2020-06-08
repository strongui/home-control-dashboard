package com.home.control.dashboard

import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.annotation.RequiresApi
import kotlinx.android.synthetic.main.activity_main.*

class MyWebChromeClient : WebChromeClient() {
    override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
        Log.d("MyApplication", consoleMessage!!.message() + " -- From line "
                + consoleMessage!!.lineNumber() + " of "
                + consoleMessage!!.sourceId());
        return super.onConsoleMessage(consoleMessage)
    }
}

class MainActivity : AppCompatActivity() {
    private var webView: WebView? = null;

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        webView = findViewById<View>(R.id.webview) as WebView
        webView!!.settings.javaScriptEnabled = true;
        webView!!.settings.javaScriptCanOpenWindowsAutomatically = true;
        webView!!.settings.domStorageEnabled = true;
        webView!!.webViewClient = WebViewClient()
        webView!!.webChromeClient = MyWebChromeClient()

        webView!!.clearCache(true)
        webview!!.clearHistory()
        // webView!!.loadUrl("https://hcc.amirkaramuja.com")
        webview!!.loadUrl("file:///android_asset/index.html");

    }

    override fun onBackPressed() {
        if (webView!!.canGoBack()) {
            webView!!.goBack();
        } else {
            super.onBackPressed()
        }
    }
}

