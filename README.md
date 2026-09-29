# FRONTIER-X — VS Code Standalone Demo

This is a zero-build, zero-install browser prototype based on the Techtrail SIH26187 presentation.

## Run
1. Extract this folder.
2. Open the folder in VS Code.
3. Double-click `index.html`, OR right-click it and choose "Open with Live Server" if you have the Live Server extension.
4. No npm, pnpm, Node.js, Python or database is required.

## Included demo modules
- Command Center dashboard
- Live camera wall (simulated)
- Person/vehicle detection overlays (simulated)
- Restricted-zone / virtual-fence intrusion
- Loitering and suspicious-activity alerts
- Digital border map
- Event history and incident timeline
- Evidence Vault with SHA-256-style demo records
- Explainable risk score
- Camera health monitoring
- Frontier AI assistant with local demo responses
- Cybersecurity/RBAC indicators
- Blockchain-ready evidence concept

## Important
This is a student demonstration prototype. CCTV/RTSP, YOLO/OpenCV inference, ByteTrack/DeepSORT, thermal/audio/drone feeds, a real blockchain network and production authentication are represented as UI/demo or integration-ready concepts rather than live defence infrastructure.

The presentation describes the architecture as React + FastAPI, Python + OpenCV + YOLO, ByteTrack/DeepSORT, AI Assistant, cybersecurity layer, blockchain/evidence and command dashboard. This standalone version intentionally removes the build/dependency layer so it runs immediately in a browser.
