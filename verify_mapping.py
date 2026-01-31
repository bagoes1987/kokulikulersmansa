import pandas as pd
import json

def get_mapping():
    file_path = r'd:\Aplikasi Web AI\LP Kokulikuler SMAN 1 Belitang\DAFTAR KOORDINATOR DAN FASILITAOTOR.xlsx'
    df = pd.read_excel(file_path, sheet_name='KOORDINATOR')
    # Membersihkan nama kolom dari spasi yang tidak terlihat
    df.columns = df.columns.str.strip()
    
    mapping = []
    current_koor = None
    
    for _, row in df.iterrows():
        nama = str(row['Nama Koordinator'])
        kelas = str(row['Koordinator Kelas'])
        username = str(row['Username'])
        
        # Jika nama tidak NaN (tidak kosong)
        if nama != 'nan':
            current_koor = {
                'nama': nama,
                'username': username,
                'kelas': [kelas]
            }
            mapping.append(current_koor)
        elif current_koor is not None and kelas != 'nan':
            # Jika nama kosong, kelas ini milik koordinator sebelumnya
            current_koor['kelas'].append(kelas)
            
    return mapping

if __name__ == "__main__":
    result = get_mapping()
    for item in result:
        print(f"Koordinator: {item['nama']}")
        print(f"Username: {item['username']}")
        print(f"Kelas: {', '.join(item['kelas'])}")
        print("-" * 30)
