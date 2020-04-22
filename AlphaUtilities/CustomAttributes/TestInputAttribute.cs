using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestAutomationFramework.Utilities.CustomAttributes
{
    [AttributeUsage(AttributeTargets.Class |
     AttributeTargets.Method,
     AllowMultiple = true)]
    public class TestInputAttribute : System.Attribute
    {
        public string ParameterName { get; set; }
        public string ParameterType { get; set; }

        public TestInputAttribute( string _parameterName, string _parameterType)
        {
            ParameterName = _parameterName;
            ParameterType = _parameterType;
        }
    }
}
