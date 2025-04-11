# **App Name**: OmniVigil

## Core Features:

- Unified Asset Registry Display: Display a unified asset registry, normalizing metadata across IT, OT, and cloud assets. The registry should display key information such as IP address, MAC address, Host name, location, owner, and lifecycle stage, create a unified schema to operate. The asset classes should be divided into IT, OT and cloud with ability to tag the asset accordingly.
- Crown Jewel Identification & Display: Implement an automated crown jewel identification system using a weighted scoring logic. Display assets tagged as 'crown jewels' based on a score exceeding a threshold (e.g., 0.7).
- Data Ingestion & Normalization: A tool to ingest asset data from various sources (CSV, Excel, real-time streams) and normalize schemas into a standard format (JSON/YAML) and API integration with Tenable, Qualys and Cylera.
- Reporting Dashboard: Generate a dashboard for visualizing asset health, vulnerabilities, misconfigurations, risk heatmaps, and compliance gaps using charts and tables.
- Role-Based Access Control: Implement role-based access control (RBAC) to restrict access to asset information and modification capabilities based on user roles (e.g., OT engineers, IT admins and CISO).

## Style Guidelines:

- Primary color: Dark blue (#1A237E) to convey security and trust.
- Secondary color: Light gray (#ECEFF1) for backgrounds and content separation.
- Accent color: Teal (#26A69A) for interactive elements and highlights.
- Clean and modern typography for readability and professional look.
- Consistent and clear icons to represent different asset types and functions.
- Well-structured layout with clear hierarchy for easy navigation and data interpretation.
- Subtle transitions and animations to enhance user experience and provide feedback.

## Original User Request:
Create a full stack Comprehensive Asset Management Module for Converged IT/OT/Cloud Environments**  

**Objective**: Develop a unified, scalable asset management solution to inventory, classify, secure, and monitor IT, OT, and cloud assets, with dynamic crown jewel identification, automated workflows, and compliance enforcement.  

---

### **Key Requirements**  
1. **Unified Asset Registry**:  
   - Normalize metadata (IP, location, owner, lifecycle stage) across IT (servers, endpoints), OT (PLCs, IoT sensors), and cloud (VMs, serverless functions).  
   - **Automated Discovery**:  
     - *IT*: Integrate with ServiceNow, SCCM, Active Directory, and Nmap.  
     - *OT*: Use Modbus, OPC-UA, Siemens/Rockwell APIs, and tools like Nozomi/Cylera.  
     - *Cloud*: Connect via AWS Systems Manager, Azure Resource Graph, and GCP APIs.  

2. **Crown Jewel Identification**:  
   - Implement weighted scoring logic:  
     ```  
     crown_jewel_score = (  
         0.4 * business_impact +  
         0.3 * data_sensitivity +  
         0.2 * access_frequency +  
         0.1 * compliance_requirement  
     )  
     ```  
   - Auto-tag assets as "crown jewels" if score > 0.7 (adjustable threshold).  
   - Dynamic tags: “Critical to Safety”, “GDPR-Relevant”, or custom labels.  

3. **Data-Driven Workflow Engine**:  
   - **Ingestion**: Support batch (CSV/Excel) and real-time streams (Kafka, MQTT, Modbus-TCP).  
   - **Processing**:  
     - Enrich data with Tenable/Qualys vulnerabilities and MITRE ATT&CK threat intel.  
     - Normalize schemas into JSON/YAML for cross-environment analytics.  
   - **Reporting**:  
     - Grafana/Power BI dashboards for asset health, risk heatmaps, and compliance gaps.  
     - Alerts for unauthorized changes or high-risk crown jewels.  

4. **Security & Compliance**:  
   - Map assets to NIST CSF, ISO 27001, GDPR, and NERC CIP.  
   - **RBAC**: Restrict OT engineers to read-only access; grant IT admins write permissions.  
   - Generate audit trails for all asset modifications (user, timestamp, action).  

5. **Lifecycle Management**:  
   - Track procurement, maintenance, and decommissioning phases.  
   - Flag EOL devices (e.g., Siemens S7-300) with automated deprecation warnings.  

6. **Real Data Connectors**:  
   - *OT*: Use `pymodbus` for PLC communication and industrial protocol integration.  
   - *Cloud*: Leverage AWS/Azure SDKs for live asset synchronization.  

7. **Advanced Analytics**:  
   - Risk heatmaps, trend analysis for asset utilization, and compliance scorecards.  

---

### **Technical Specifications**  
- **Architecture**: Microservices with Kubernetes orchestration.  
- **Database**: Time-series (InfluxDB) for OT metrics; graph (Neo4j) for asset relationships.  
- **APIs**: RESTful endpoints for third-party integrations (ServiceNow, Splunk).  

**Deliverables**: MVP with asset discovery, crown jewel scoring, and Grafana dashboards.  

---
**Success Metrics**: 90% asset visibility, 30% faster risk mitigation, full audit compliance.
  