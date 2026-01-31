import pandas as pd
import json

def read_excel():
    file_path = r'd:\Aplikasi Web AI\LP Kokulikuler SMAN 1 Belitang\DAFTAR KOORDINATOR DAN FASILITAOTOR.xlsx'
    try:
        # Membaca semua sheet
        xl = pd.ExcelFile(file_path)
        print(f"Sheets: {xl.sheet_names}")
        
        for sheet in xl.sheet_names:
            print(f"\n--- Sheet: {sheet} ---")
            df = pd.read_excel(file_path, sheet_name=sheet)
            # Menampilkan seluruh baris
            print(df.to_string())
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    read_excel()
