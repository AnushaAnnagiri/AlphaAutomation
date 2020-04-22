using NUnit.Framework;
using OpenQA.Selenium;
using System;

namespace TestAutomationFramework.Tests.TestSteps
{
    public class CustomerIdentification : TestBase
    {
        [Test(Description = "Amazon Logo Validation")]
        public void LogoValidation()
        {
            driver.Url = "https://www.amazon.in/";
            driver.Manage().Window.Maximize();
            IWebElement Logo = driver.FindElement(By.XPath("//a[@class='nav-logo-link']"));
            Boolean status = Logo.Displayed;

        }

        [Test(Description = "Amazon window title validation")]
        public void TitleValidation()
        {
            driver.Url = "https://www.amazon.in/";
            driver.Manage().Window.Maximize();
            String title = driver.Title;

            Assert.AreEqual(title, "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");

        }

        [Test(Description = "Window ScrolBar Validation")]
        public void ScrollBarValidation()
        {
            driver.Url = "https://www.amazon.in/";
            driver.Manage().Window.Maximize();
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            js.ExecuteScript("window.scrollTo(0, 500)");
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction3\\Step10.png", ScreenshotImageFormat.Png);
        }
    }
}
